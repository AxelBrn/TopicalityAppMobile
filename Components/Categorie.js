import React from 'react'
import {StyleSheet, Text, View } from 'react-native';
import {getArticleByCategorie} from '../Api/articleApi';
import ArticleList from './ArticleList';

class Categorie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoading: true,
            refreshing: false
        }
        this._loadArticle()
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._loadArticle()
    }

    _loadArticle() {
        getArticleByCategorie(this.props.route.params.idCategorie).then(data => this.setState({
            articles : data,
            isLoading: false,
            refreshing: false
        }))
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text style={styles.categories_title}>Tous les articles de la catégorie {this.props.route.params.libelleCateg} :</Text>
                <ArticleList
                    navigation={this.props.navigation}
                    articles={this.state.articles}
                    isLoading={this.state.isLoading}
                    refreshing={this.state.refreshing}
                    refresh={this._onRefresh}
                    isRefreshCheck={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    categories_title: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#7571f9',
        marginBottom: 7
    }
})

export default Categorie
