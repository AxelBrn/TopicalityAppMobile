import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import { getImageFromAPI} from '../Api/articleApi'

class ArticleItem extends React.Component{
    render() {
        const {article} = this.props;
        return (
            <View style={styles.corps}>
                <View>
                    <Image
                    style={styles.images}
                    source={{uri: getImageFromAPI(article.image)}}
                    />
                </View>
                <View>
                    <Text style={styles.titre_article}>{article.nom}</Text>
                </View>
                <View>
                    <Text style={styles.description_article}>{article.sous_titre}</Text>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    corps: {
        height: 300
    },
    images: {
        width: 200,
        height: 115,
        margin: 5,
    },
    titre_article: {
        textAlign: 'center',
        //fontSize: '20',
    },
    description_article: {
        textAlign: 'left',
        //fontSize: '10',
        margin: 5,

    }
});

export default ArticleItem
