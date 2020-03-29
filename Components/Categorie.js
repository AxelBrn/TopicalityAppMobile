import React from 'react'
import {Alert, StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import {getArticleByCategorie} from '../Api/articleApi';
import ArticleList from './ArticleList';
import NoInternet from './NoInternet';

class Categorie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoading: true,
            refreshing: false,
            isConnected: false
        }
        this._checkConnectivity(false)
    }

    _checkConnectivity = (isRefreshing) => {
        NetInfo.fetch().then(state => {
            if(state.isConnected !== this.state.isConnected && isRefreshing === false){
                this.setState({
                    isConnected: state.isConnected
                })
            }
            if(state.isConnected){
                this._loadArticle()
            }else{
                this.setState({
                    refreshing: false
                })
                Alert.alert('Pas de connexion', 'Vérifiez votre connexion internet')
            }
        })
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._checkConnectivity()
    }

    _loadArticle() {
        getArticleByCategorie(this.props.route.params.idCategorie).then(data => this.setState({
            articles : data,
            isLoading: false,
            refreshing: false
        }))
    }

    _displayCategorieArticles() {
        if(this.state.isConnected) {
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
                        color={'#7571f9'}
                    />
                </View>
            )
        }
        return (
            <NoInternet
                color={'#7571f9'}
                retry={this._checkConnectivity}
            />
        )
    }

    render() {
        return (
            this._displayCategorieArticles()
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
