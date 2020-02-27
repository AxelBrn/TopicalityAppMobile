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
                article: data,
                isLoading: false
            })
        })
    }

    _displayArticle() {
        if (this.state.article !== undefined){
            return(
                <View>
                    <Text>{this.state.article.nom}</Text>
                </View>
                /*<ScrollView style={styles.scrollview_article}>
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
                </ScrollView>*/
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
        flex: 1
    },
    titre_article: {
        textAlign: 'center',
        fontSize: 27,
        fontWeight: 'bold',
    },
    description_article: {
        textAlign: 'left'
    },
    source_article: {
        textAlign: 'left'
    },
    auteur_article: {
        textAlign: 'center',
    },
    publie_article: {
        textAlign: 'left',
    },
    categorie_article: {
        textAlign: 'right',
    },
    caracteristique_article: {
        flex: 1,
    }
})

export default ArticleDetail
