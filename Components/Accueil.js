import React from 'react'
import {StyleSheet} from 'react-native'
import ArticleList from './ArticleList';
import {getAllArticlesFromAPI} from '../Api/articleApi';

class Accueil extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articles: [], isLoading: true
        }
        this._loadArticle()
    }

    _loadArticle() {
        getAllArticlesFromAPI().then(data => this.setState({
            articles : data,
            isLoading: false
        }))
    }

    render() {
        return (
            <ArticleList
                navigation={this.props.navigation}
                articles={this.state.articles}
                isLoading={this.state.isLoading}
            />
        )
    }
}

const styles = StyleSheet.create({
});

export default Accueil
