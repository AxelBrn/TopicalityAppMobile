import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import { getImageFromAPI} from '../Api/articleApi'
import { connect } from 'react-redux'

class ArticleItem extends React.Component{

    constructor() {
        super()
        this.state = { buttonLireIsActive : false}
    }

    _toggleALirePlusTard() {
        const action = { type: "TOGGLE_PLUS_TARD", value: this.props.article }
        this.props.dispatch(action)
    }

    _displayImage(image) {
        if((image == null)||(image.indexOf('/tmp/') !== -1)){
            return(
                <Image
                    style={styles.images}
                    source={require('../Images/no-image.jpg')}
                />
            )
        }
        return (
            <Image
                style={styles.images}
                source={{uri: getImageFromAPI(image)}}
            />
        )
    }

    _displayLireImage() {
        var sourceImage = require('../Images/BookmarkPasLire.png')
        if (this.props.articlesALire.findIndex(item => item.id === this.props.article.id) !== -1) {
            sourceImage = require('../Images/BookmarkLire.png')
        }
        return (
            <Image
                style={styles.lire_image}
                source={sourceImage}
            />
        )
    }

    _displayButtonALirePlusTard () {
        if(this.state.buttonLireIsActive) {
            return(
                <TouchableOpacity
                    style={styles.button_container}
                    onPress={() => {
                        this.setState({
                            buttonLireIsActive: false
                        })
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this._toggleALirePlusTard()
                            setTimeout(() => {
                                this.setState({
                                    buttonLireIsActive: false
                                })
                            }, 500)
                        }}
                    >
                        {this._displayLireImage()}
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }
    }

    _setFormatDate(date) {
        return date.substr(8,2) + '/' + date.substr(5,2) + '/' + date.substr(0,4)
    }


    render() {
        const {article, displayArticle} = this.props;
        return (
            <View>
                <TouchableOpacity
                    style={styles.corps}
                    delayLongPress={500}
                    onLongPress={()=>{this.setState({
                        buttonLireIsActive: true
                    })}}
                    onPress={() => displayArticle(article.id)}>
                    <View style={styles.globale_article}>
                        {this._displayImage(article.image)}
                        <View style={styles.main_article}>
                            <Text style={styles.titre_article}>{article.nom}</Text>
                            <Text style={styles.description_article} numberOfLines={4}>{article.sous_titre}</Text>
                        </View>
                    </View>

                    <View style={styles.contenu_article}>
                        <Text style={styles.auteur_article}>{article.u_nom} {article.u_prenom}</Text>
                        <Text style={styles.publie_article}>{this._setFormatDate(article.datetime)}</Text>
                        <Text style={styles.categorie_article}>{article.libelle}</Text>
                    </View>
                </TouchableOpacity>
                {this._displayButtonALirePlusTard()}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    corps: {
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingBottom: 10,
        height: 140
    },
    images: {
        width: 300,
        height: 100,
        margin: 5,
        flex:2
    },
    titre_article: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        marginRight: 2,
    },
    description_article: {
        textAlign: 'left',
        marginRight: 2,
        marginLeft: 2,
        marginTop: 6,
        fontSize: 12
    },
    auteur_article: {
        textAlign: 'center',
        flex: 1,
        fontSize: 10,
        color: 'gray'
    },

    publie_article: {
        textAlign: 'center',
        flex: 1,
        fontSize: 10,
        color: 'gray'
    },
    categorie_article: {
        textAlign: 'center',
        flex: 1,
        fontSize: 10,
        color: 'gray'
    },
    contenu_article: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5,
    },
    main_article: {
        flexDirection: 'column',
        flex:3,
    },
    globale_article: {
        flexDirection: 'row',
    },
    button_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(175, 175, 175, 0.7)',
    },
    lire_image: {
        width: 55,
        height: 55
    },
    logo_close: {
        width: 30,
        height: 30
    },
    button_close: {
        position: 'absolute',
        right: 30
    }
});

const mapStateToProps = (state) => {
    return {
        articlesALire: state.articlesALire
    }
}

export default connect (mapStateToProps)(ArticleItem)
