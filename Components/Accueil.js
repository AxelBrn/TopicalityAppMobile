import React from 'react'
import ArticleList from './ArticleList'
import {getAllArticlesFromAPI} from '../Api/articleApi'

class Accueil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            refreshing: false,
            isLoading: true
        }
        this._loadArticle()
    }

    _loadArticle() {
        getAllArticlesFromAPI().then(data => this.setState({
            articles : data,
            isLoading: false,
            refreshing: false
        }))
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._loadArticle()
    }

    render() {
        return (
            <ArticleList
                navigation={this.props.navigation}
                articles={this.state.articles}
                isLoading={this.state.isLoading}
                refreshing={this.state.refreshing}
                refresh={this._onRefresh}
                isRefreshCheck={true}
            />
        )
    }
}

export default Accueil
