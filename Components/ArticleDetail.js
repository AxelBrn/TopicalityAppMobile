import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Linking} from 'react-native';
import {getImageFromAPI, getArticleByIdFromAPI} from '../Api/articleApi'
import Hyperlink from 'react-native-hyperlink'
import Markdown from 'react-native-markdown-package'
import { connect } from 'react-redux'

class ArticleDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            article: undefined,
            isLoading: true
        }
    }
    _toggleALirePlusTard() {
        const action = { type: "TOGGLE_PLUS_TARD", value: this.state.article }
        this.props.dispatch(action)
    }

    _displayLireImage() {
        var sourceImage = require('../Images/BookmarkPasLire.png')
        if (this.props.articlesALire.findIndex(item => item.id === this.state.article.id) !== -1) {
            sourceImage = require('../Images/BookmarkLire.png')
        }
        return (
            <Image
                style={styles.lire_image}
                source={sourceImage}
            />
        )
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color={'black'}/>
                </View>
            )
        }
    }

    _displayImageArticle(image) {
        if((image == null)||(image.indexOf('/tmp/') !== -1)){
            return(
                <Image/>
            )
        }
        return (
            <Image
                style={styles.images}
                source={{uri: getImageFromAPI(image)}}
            />
        )
    }

    _setFormatDate(date) {
        return date.substr(8,2) + '/' + date.substr(5,2) + '/' + date.substr(0,4)
    }

    componentDidMount() {
        getArticleByIdFromAPI(this.props.route.params.idArticle).then(data => {
            this.setState({
                article: data[0],
                isLoading: false
            })
        })
    }

    _displayArticle() {
        if (this.state.article !== undefined){
            return(
                <ScrollView style={styles.scrollview_article}>
                    <Text style={styles.titre_article}>{this.state.article.nom}</Text>
                    {this._displayImageArticle(this.state.article.image)}
                    <TouchableOpacity
                        style={styles.lire_PlusTard}
                        onPress={() => this._toggleALirePlusTard()}>
                        {this._displayLireImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_article}>{this.state.article.sous_titre}</Text>
                    <View style={styles.contenu_article}>
                        <Markdown>
                            {this.state.article.contenu}
                        </Markdown>
                    </View>
                    <Hyperlink linkDefault={ true }>
                        <Text style={styles.source_article}>{this.state.article.source}</Text>
                    </Hyperlink>
                    <Text style={styles.auteur_article}>{this.state.article.u_nom} {this.state.article.u_prenom}</Text>
                    <View style={styles.caracteristique_article}>
                        <Text style={styles.publie_article}>{this._setFormatDate(this.state.article.datetime)}</Text>
                        <Text style={styles.categorie_article}>{this.state.article.libelle}</Text>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this._displayLoading()}
                {this._displayArticle()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollview_article: {
    },
    titre_article: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 10
    },
    description_article: {
        textAlign: 'left',
        marginRight: 5,
        marginLeft: 5,
        paddingTop: 4,
        paddingBottom: 4
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    source_article: {
        textAlign: 'left',
        marginRight: 5,
        marginLeft: 5,
        paddingTop: 5,
        color: 'blue',
        fontStyle: 'italic'
    },
    auteur_article: {
        textAlign: 'center',
        color: 'gray',
        paddingTop: 5
    },
    publie_article: {
        textAlign: 'center',
        flex: 1,
        color: 'gray',
        paddingTop: 5
    },
    categorie_article: {
        textAlign: 'center',
        flex: 1,
        color: 'gray',
        paddingTop: 5
    },
    caracteristique_article: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    images: {
        height: 200,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    },
    contenu_article: {
        marginRight: 5,
        marginLeft: 5,
    },
    lire_PlusTard: {
        alignItems: 'center'
    },
    lire_image: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return {
        articlesALire: state.articlesALire
    }
}

export default connect (mapStateToProps)(ArticleDetail)
