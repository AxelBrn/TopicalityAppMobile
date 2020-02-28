import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import { getImageFromAPI} from '../Api/articleApi'

class ArticleItem extends React.Component{

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

    render() {
        const {article, displayArticle} = this.props;
        return (
            <TouchableOpacity
                style={styles.corps}
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
                    <Text style={styles.publie_article}>{article.datetime}</Text>
                    <Text style={styles.categorie_article}>{article.libelle}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}
const styles = StyleSheet.create({
    corps: {
        marginTop: 10,
        marginBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingBottom: 10
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
}
});

export default ArticleItem
