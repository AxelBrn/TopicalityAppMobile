import React from 'react'
import {StyleSheet, FlatList, View, Text} from 'react-native'
import ArticleItem from './ArticleItem';
import { getAllArticlesFromAPI} from '../Api/articleApi'

class ArticleList extends React.Component{

    constructor(props) {
        super(props);
        this.state = { articles: [] }
        this._loadArticle()
    }

    _loadArticle() {
        getAllArticlesFromAPI().then(data => this.setState({ articles : data }))
    }

    render() {
        return (
            <View>
                <FlatList
                    data={ this.state.articles }
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <ArticleItem
                            article={item}
                        />
                    )}
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({

})

export default ArticleList
