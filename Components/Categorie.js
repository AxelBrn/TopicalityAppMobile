import React from 'react'
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {getArticleByCategorie} from '../Api/articleApi';
import ArticleList from './ArticleList';

class Categorie extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articles: [], isLoading: true
        }
        this._loadArticle()
    }

    _loadArticle() {
        getArticleByCategorie(this.props.route.params.idCategorie).then(data => this.setState({
            articles : data,
            isLoading: false
        }))
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text style={styles.categories_title}>Tous les articles de la catégorie {this.props.route.params.libelleCateg} :</Text>
                <ScrollView>
                    <ArticleList
                        navigation={this.props.navigation}
                        articles={this.state.articles}
                        isLoading={this.state.isLoading}
                    />
                </ScrollView>
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
