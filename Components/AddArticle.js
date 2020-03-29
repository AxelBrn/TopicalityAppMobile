import React from 'react'
import {StyleSheet, Text, View, ScrollView, TextInput, Picker, Image, TouchableOpacity, Alert} from 'react-native';
import { getAllCategoriesFromAPI } from '../Api/categorieApi'
import ImagePicker from 'react-native-image-picker'
import {addArticle} from '../Api/articleApi'
import NetInfo from '@react-native-community/netinfo';

class AddArticle extends React.Component {

    constructor() {
        super()
        this.state = {
            categories: [],
            categSelected: 1,
            image: undefined,
            erreur: false,
            isConnected: false
        }
        this.titre= ""
        this.sousTitre = ""
        this.contenu = ""
        this.source = ""
        this._checkConnectivity()
    }

    _checkConnectivity = () => {
        NetInfo.fetch().then(state => {
            if(state.isConnected !== this.state.isConnected){
                this.setState({
                    isConnected: state.isConnected
                })
            }
            if(state.isConnected){
                this._getAllCategories()
            }
        })
    }

    options = {
        title: 'Choisir une image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    }

    _getAllCategories() {
        getAllCategoriesFromAPI().then(data => this.setState({
            categories: data
        }))
    }

    _displayImagePicker() {
        ImagePicker.launchImageLibrary(this.options, (response) => {
            this.setState({
                image: response
            })
        });
    }

    _titreTextInputChanged(text) {
        this.titre = text
    }

    _sousTitreTextInputChanged(text) {
        this.sousTitre = text
    }

    _contenuTextInputChanged(text) {
        this.contenu = text
    }

    _sourceTextInputChanged(text) {
        this.source = text
    }

    _displayTextError() {
        if(this.state.erreur) {
            return (
                <Text style={styles.text_error}> Veuillez remplir les champs obligatoire !</Text>
            )
        }
    }

    _publish() {
        NetInfo.fetch().then(state => {
            if(state.isConnected !== this.state.isConnected){
                this.setState({
                    isConnected: state.isConnected
                })
                if(state.isConnected === false){
                    Alert.alert('Pas de connexion', 'Vérifiez votre connexion internet')
                }
            }
            if(state.isConnected){
                let user = this.props.route.params.idUser
                if(this.titre === '' || this.contenu === '' || this.source === ''){
                    this.setState({erreur: true})
                }else{
                    addArticle(user, this.state.categSelected, this.titre, this.sousTitre, this.contenu, this.source, this.state.image).then(data => console.log(data))
                    this.props.navigation.goBack()
                }
            }
        })
    }

    _displayImage() {
        if(this.state.image !== undefined) {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Image
                        style={styles.images}
                        source={{uri: this.state.image.uri}}
                    />
                    <TouchableOpacity
                        style={styles.trash_button}
                        onPress={() => this.setState({
                            image: undefined
                        })}
                    >
                        <Image
                            style={{width:30, height: 30}}
                            source={require('../Images/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _displayPickerCategorie() {
        return (
            <View style={styles.picker_container}>
                <Picker
                    style={styles.picker}
                    mode='dropdown'
                    selectedValue={this.state.categSelected}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({categSelected: itemValue})
                    }
                >
                    {  this.state.categories.map( (v)=>{
                        return <Picker.Item label={v.libelle} value={v.id} />
                    }) }
                </Picker>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                {this._displayTextError()}
                <Text style={styles.text}>Catégorie *</Text>
                {this._displayPickerCategorie()}
                <Text style={styles.text}>Titre de l'article *</Text>
                <View style={styles.textInput_container}>
                    <TextInput
                        style={styles.textInput_titre}
                        placeholder="Titre de l'article"
                        placeholderTextColor={'#4e94f3'}
                        onChangeText={(text) => this._titreTextInputChanged(text)}
                        multiline={true}
                        maxLength={250}
                    />
                </View>
                <Text style={styles.text}>Sous-titre de l'article</Text>
                <View style={styles.textInput_container}>
                    <TextInput
                        style={styles.textInput_titre}
                        placeholder="Sous-titre de l'article"
                        placeholderTextColor={'#4e94f3'}
                        onChangeText={(text) => this._sousTitreTextInputChanged(text)}
                        multiline={true}
                        maxLength={255}
                    />
                </View>
                <Text style={styles.text}>Contenu *</Text>
                <View style={styles.textInput_container}>
                    <TextInput
                        style={styles.textInput_contenu}
                        placeholder="Contenu"
                        placeholderTextColor={'#4e94f3'}
                        onChangeText={(text) => this._contenuTextInputChanged(text)}
                        multiline={true}
                    />
                </View>
                <Text style={styles.text}>Source *</Text>
                <View style={styles.textInput_container}>
                    <TextInput
                        style={styles.textInput_titre}
                        placeholder="Source"
                        placeholderTextColor={'#4e94f3'}
                        onChangeText={(text) => this._sourceTextInputChanged(text)}
                        multiline={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.bouton}
                    onPress={() => this._displayImagePicker()}
                >
                    <Text style={styles.textButon}>Chosir une image</Text>
                </TouchableOpacity>
                {this._displayImage()}
                <TouchableOpacity
                    style={[styles.bouton, {marginBottom: 20}]}
                    onPress={() => this._publish()}
                >
                    <Text style={styles.textButon}>Publier</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    picker_container: {
        marginTop: 8,
        borderColor: '#4e94f3',
        borderWidth: 2,
        alignSelf: 'center',
        width: '80%',
        borderRadius: 30,
    },
    picker: {
        color: '#4e94f3',
    },
    text: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10
    },
    textInput_container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4e94f3',
        borderWidth: 2,
        borderRadius: 50,
        width: 320,
        alignSelf: 'center',
        marginTop: 5
    },
    textInput_titre: {
        marginRight: 15,
        marginLeft: 15,
        maxHeight: 100
    },
    textInput_contenu: {
        marginRight: 15,
        marginLeft: 15,
        maxHeight: 200
    },
    bouton: {
        borderRadius: 50,
        borderWidth :2,
        marginTop: 15,
        borderColor: '#4e94f3',
        width: 320,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#4e94f3'
    },
    textButon: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    text_error: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 5,
        color: 'red'
    },
    images: {
        width: 100,
        height: 65,
        marginLeft: 30,
        marginTop: 10
    },
    trash_button: {
        borderRadius: 50,
        backgroundColor: '#ff5050',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    }
})

export default AddArticle
