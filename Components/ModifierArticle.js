import React from 'react'
import {StyleSheet, Text, View, ScrollView, TextInput, Picker, Image, TouchableOpacity, Alert} from 'react-native';
import { getAllCategoriesFromAPI } from '../Api/categorieApi'
import ImagePicker from 'react-native-image-picker'
import {updateArticle, getImageFromAPI} from '../Api/articleApi'
import NetInfo from '@react-native-community/netinfo';

class ModifierArticle extends React.Component {

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
            this.setState({
                categSelected: this.props.route.params.article.categorie_id
            })
        })
    }

    _setBackgroundColor() {
        return {
            backgroundColor: this.props.route.params.color
        }
    }

    _setBorderColor() {
        return {
            borderColor: this.props.route.params.color
        }
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
                let id = this.props.route.params.article.id
                if(this.titre === '' || this.contenu === '' || this.source === ''){
                    this.setState({erreur: true})
                }else{
                    updateArticle(this.state.categSelected, this.titre, this.sousTitre, this.contenu, this.source, this.state.image, id).then(data => console.log(data))
                    this.props.navigation.goBack()
                    this.props.route.params.reload();
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
        else if(this.props.route.params.article.image !== null){
            return (
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.images}
                        source={{uri: getImageFromAPI(this.props.route.params.article.image)}}
                    />
                </View>
            )
        }
    }

    _displayPickerCategorie() {
        return (
            <View style={[styles.picker_container, this._setBorderColor()]}>
                <Picker
                    style={{color: this.props.route.params.color}}
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

    componentDidMount() {
        this.titre = this.props.route.params.article.nom
        this.sousTitre = this.props.route.params.article.sous_titre
        this.contenu = this.props.route.params.article.contenu
        this.source = this.props.route.params.article.source
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                {this._displayTextError()}
                <Text style={styles.text}>Catégorie *</Text>
                {this._displayPickerCategorie()}
                <Text style={styles.text}>Titre de l'article *</Text>
                <View style={[styles.textInput_container, this._setBorderColor()]}>
                    <TextInput
                        style={styles.textInput_titre}
                        placeholder="Titre de l'article"
                        placeholderTextColor={this.props.route.params.color}
                        onChangeText={(text) => this._titreTextInputChanged(text)}
                        multiline={true}
                        maxLength={250}
                    >
                        <Text>{this.props.route.params.article.nom}</Text>
                    </TextInput>
                </View>
                <Text style={styles.text}>Sous-titre de l'article</Text>
                <View style={[styles.textInput_container, this._setBorderColor()]}>
                    <TextInput
                        style={styles.textInput_titre}
                        placeholder="Sous-titre de l'article"
                        placeholderTextColor={this.props.route.params.color}
                        onChangeText={(text) => this._sousTitreTextInputChanged(text)}
                        multiline={true}
                        maxLength={255}
                    >
                        <Text>{this.props.route.params.article.sous_titre}</Text>
                    </TextInput>
                </View>
                <Text style={styles.text}>Contenu *</Text>
                <View style={[styles.textInput_container, this._setBorderColor()]}>
                    <TextInput
                        style={styles.textInput_contenu}
                        placeholder="Contenu"
                        placeholderTextColor={this.props.route.params.color}
                        onChangeText={(text) => this._contenuTextInputChanged(text)}
                        multiline={true}
                    >
                        <Text>{this.props.route.params.article.contenu}</Text>
                    </TextInput>
                </View>
                <Text style={styles.text}>Source *</Text>
                <View style={[styles.textInput_container, this._setBorderColor()]}>
                    <TextInput
                        style={styles.textInput_titre}
                        placeholder="Source"
                        placeholderTextColor={this.props.route.params.color}
                        onChangeText={(text) => this._sourceTextInputChanged(text)}
                        multiline={true}
                    >
                        <Text>{this.props.route.params.article.source}</Text>
                    </TextInput>
                </View>
                <TouchableOpacity
                    style={[styles.bouton, this._setBackgroundColor(), this._setBorderColor()]}
                    onPress={() => this._displayImagePicker()}
                >
                    <Text style={styles.textButon}>Chosir une image</Text>
                </TouchableOpacity>
                {this._displayImage()}
                <TouchableOpacity
                    style={[styles.bouton, {marginBottom: 20}, this._setBackgroundColor(), this._setBorderColor()]}
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
        borderWidth: 2,
        alignSelf: 'center',
        width: '80%',
        borderRadius: 30,
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
        width: 320,
        height: 50,
        alignSelf: 'center',
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

export default ModifierArticle
