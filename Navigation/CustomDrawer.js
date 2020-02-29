import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Text, FlatList} from "react-native"
import { getAllCategoriesFromAPI } from '../Api/categorieApi'


class CustomDrawer extends React.Component {

    constructor() {
        super()
        this.state = {categories: []}
        this._recupAllCategories()
    }

    _displayImageCategorie(path) {
        let pathImage = ''
        switch (path) {
            case '1' :
                pathImage= require('../Images/icons_categorie/Programmation.png')
                break
            case '2' :
                pathImage= require('../Images/icons_categorie/Base_de_données.png')
                break
            case '3' :
                pathImage= require('../Images/icons_categorie/Réseau.png')
                break
            case '4' :
                pathImage= require('../Images/icons_categorie/Télécom.png')
                break
            case '5' :
                pathImage= require('../Images/icons_categorie/Sécurité.png')
                break
            case '6' :
                pathImage= require('../Images/icons_categorie/Matériel.png')
                break
            case '7' :
                pathImage= require('../Images/icons_categorie/Logiciel.png')
                break
            case '8' :
                pathImage= require('../Images/icons_categorie/Intelligence_artificielle.png')
                break
            case '9' :
                pathImage= require('../Images/icons_categorie/IoT.png')
                break
            case '10' :
                pathImage= require('../Images/icons_categorie/Innovation_technologique.png')
                break
            case '11' :
                pathImage= require('../Images/icons_categorie/Veille_juridique.png')
                break
            case '12' :
                pathImage= require('../Images/icons_categorie/Économie.png')
                break
            default:
                pathImage= require('../Images/icons_categorie/Autre.png')
                break
        }
        return (
            <Image
                source={pathImage}
                style={styles.icon}
            />
        )
    }

    _recupAllCategories() {
        getAllCategoriesFromAPI().then(data => this.setState({
            categories: data
        }))
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.background_logo}
                    onPress={() => this.props.navigation.navigate('Connexion')}
                >
                    <Image
                        source={require('../Images/logo_Topicality.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <View style={{backgroundColor: '#ffffff'}}>
                    <View>
                        <View style={styles.title_drawer_text}>
                            <Text style={styles.text_style}>CATÉGORIES</Text>
                        </View>
                        <FlatList
                            data={ this.state.categories }
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    style={styles.button_drawer_categorie}
                                    onPress={() => this.props.navigation.navigate('Categorie', {idCategorie: item.id, libelleCateg: item.libelle})}
                                >
                                    {this._displayImageCategorie(item.id)}
                                    <Text style={styles.text_style}>{item.libelle}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text_style: {
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title_drawer_text: {
        marginTop:7,
        marginBottom:10,
        paddingBottom:10,
    },
    button_drawer_categorie: {
        height:45,
        borderBottomWidth: 0.2,
        alignItems: 'center',
        paddingLeft: 8,
        borderColor: 'grey',
        flexDirection: 'row',
    },
    logo: {
        height: 30,
        alignSelf: 'center'
    },
    icon: {
        height:20,
        width:20,
        marginRight: 10
    },
    background_logo: {
        marginTop: -10,
        paddingTop:20,
        backgroundColor: '#7571f9',
        height:60
    }
})

export default CustomDrawer
