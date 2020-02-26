import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

class ArticleDetail extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Je suis le detail d'un article</Text>
            </View>

        )
    }
}
const styles = StyleSheet.create({

})

export default ArticleDetail
