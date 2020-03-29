import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Alert } from 'react-native'
import ArticleList from './ArticleList'
import {getAllArticlesFromAPI} from '../Api/articleApi'
import NoInternet from './NoInternet';

class Accueil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            refreshing: false,
            isLoading: true,
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

    _loadArticle() {
         getAllArticlesFromAPI().then(data => this.setState({
             articles : data,
             isLoading: false,
             refreshing: false
         }))
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._checkConnectivity(true)
    }

    _displayArticleList() {
        if(this.state.isConnected){
            return (
                <ArticleList
                    navigation={this.props.navigation}
                    articles={this.state.articles}
                    isLoading={this.state.isLoading}
                    refreshing={this.state.refreshing}
                    refresh={this._onRefresh}
                    isRefreshCheck={true}
                    color={'#7571f9'}
                />
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
                this._displayArticleList()
        )
    }
}

export default Accueil
