import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image} from 'react-native';
import {getImageFromAPI, getArticleByIdFromAPI} from '../Api/articleApi'

class ArticleDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            article: undefined,
            isLoading: true
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayImageArticle(image) {
        if((image !== null)||(image.indexOf('/tmp/') === -1)){
            return (
                <Image
                    style={styles.images}
                    source={{uri: getImageFromAPI(image)}}
                />
            )
        }
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
                    <Text style={styles.description_article}>{this.state.article.sous_titre}</Text>
                    <Text style={styles.contenu_article}>{this.state.article.contenu}</Text>
                    <Text style={styles.source_article}>{this.state.article.source}</Text>
                    <Text style={styles.auteur_article}>{this.state.article.u_nom} {this.state.article.u_prenom}</Text>
                    <View style={styles.caracteristique_article}>
                        <Text style={styles.publie_article}>{this.state.article.datetime}</Text>
                        <Text style={styles.categorie_article}>{this.state.article.libelle}</Text>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View>
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
    source_article: {
        textAlign: 'left',
        marginRight: 5,
        marginLeft: 5,
        paddingTop: 5,
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
        marginBottom: 5
    },
    contenu_article: {
        marginRight: 5,
        marginLeft: 5,
    }
})

export default ArticleDetail
