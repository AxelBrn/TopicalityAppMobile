import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import { connect } from 'react-redux'
import {getArticleByUser} from '../Api/articleApi'
import ArticleList from './ArticleList'
import ButtonAdd from './LittleCompnents/ButtonAdd'
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './NoInternet';

class MesArticles extends React.Component {
    constructor() {
        super();
        this.state = {
            mesArticles: [],
            isLoading : true,
            refreshing: false,
            isConnected: false
        }
    }

    _checkConnectivity = (isRefreshing) => {
        NetInfo.fetch().then(state => {
            if(state.isConnected !== this.state.isConnected){
                this.setState({
                    isConnected: state.isConnected
                })
            }
            if(state.isConnected){
                this._loadMesArticles()
            }else if(isRefreshing){
                this.setState({
                    refreshing: false
                })
                Alert.alert('Pas de connexion', 'Vérifiez votre connexion internet')
            }
        })
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._checkConnectivity(true)
    }

    _displayAddButton() {
        if(this.state.isConnected){
            return (
                <View style={styles.absolute_button}>
                    <ButtonAdd
                        navigation={this.props.navigation}
                        user={this.props.user.id}
                        setIsConnected={this._onPressAddButton}
                        isConnected={this.state.isConnected}
                    />
                </View>
            )
        }
    }

    _onPressAddButton = (value) => {
         this.setState({
             isConnected: value
         })
    }

    _displayNoConnection () {
        if(this.props.user === undefined) {
            return (
                <View style={styles.bouton_connecter}>
                    <Image
                        source={require('../Images/news.png')}
                        style={styles.mesArticles}
                        />
                    <Text style={styles.Connecte_vous}>Si vous souhaitez accéder à vos articles veuilliez vous connecter </Text>
                    <TouchableOpacity
                        style={styles.bouton_connexion}
                        onPress={() => this.props.navigation.navigate('Connexion')}
                    >
                        <Text style={styles.textButon}>Se Connecter</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _loadMesArticles() {
            getArticleByUser(this.props.user.id).then(data => this.setState({
                mesArticles : data,
                isLoading : false,
                refreshing: false
            }))
    }

    _displayMesArticles () {
        if(this.props.user !== undefined) {
            if(this.state.mesArticles.length === 0){
                this._checkConnectivity(false)
            }
            if(this.state.isConnected || this.state.mesArticles.length > 0){
                if(this.state.mesArticles !== null) {
                    return (
                        <View style={{flex: 1}}>
                            <ArticleList
                                navigation={this.props.navigation}
                                articles={this.state.mesArticles}
                                isLoading={this.state.isLoading}
                                refreshing={this.state.refreshing}
                                refresh={this._onRefresh}
                                isRefreshCheck={true}
                                color={'#4e94f3'}
                            />
                            {this._displayAddButton()}
                        </View>
                    )
                }
                return (
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>Vous n'avez pas encore publié d'articles !</Text>
                        <View style={styles.absolute_button}>
                            <ButtonAdd
                                navigation={this.props.navigation}
                                user={this.props.user.id}
                                setIsConnected={this._onPressAddButton}
                                isConnected={this.state.isConnected}
                            />
                        </View>
                    </View>
                )
            }
            return (
                <NoInternet
                    color={'#4e94f3'}
                    retry={this._checkConnectivity}
                />
            )
        }

    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this._displayNoConnection()}
                {this._displayMesArticles()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bouton_connecter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
},
    bouton_connexion: {
        borderRadius: 50,
        borderWidth :2,
        marginBottom: 10,
        borderColor: '#4e94f3',
        width: 320,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#4e94f3',
        marginTop : 60
    },
    textButon: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        fontSize: 17
    },
    Connecte_vous : {
        textAlign: 'center',
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 5,
        marginLeft: 5
    },
    mesArticles : {
        height: 125,
        width: 125,
        marginBottom: 50
    },
    text: {
        marginTop: 15,
        color:'gray',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    absolute_button: {
        position: 'absolute',
        left: 0,
        right: 20,
        top: 0,
        bottom: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MesArticles)
