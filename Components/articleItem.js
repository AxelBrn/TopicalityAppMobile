import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

class articleItem extends React.Component{
    //const article = this.props.article
    render() {
        return (
            <View style={styles.corps}>
                <View>
                    <Image
                    style={styles.image}
                    source={{uri: "image"}}
                    />
                </View>
                <View>
                    <Text style={styles.titre_article}>{}</Text>
                </View>
                <View>
                    <Text style={styles.description_article}>{}</Text>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    corps: {
        flexDirection: 'row',
        height: 400
    },
    image: {
        width: 200,
        height: 115,
        margin: 5,
        flexDirection: 'row'
    },
    titre_article: {
        textAlign: 'center',
        fontSize: '20',
        flexDirection: 'row'
    },
    description_article: {
        textAlign: 'left',
        fontSize: '10',
        margin: 5,
        flexDirection: 'row'
    }
});

export default articleItem
