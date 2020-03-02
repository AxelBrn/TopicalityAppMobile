import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { connect } from 'react-redux'
import {getArticleByUser} from '../Api/articleApi'
import ArticleList from './ArticleList';

class MesArticles extends React.Component {
    constructor() {
        super();
        this.state = {
            mesArticles: [],
            isLoading : true,
            index : 0
        }
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
        if(this.state.index === 0) {
            getArticleByUser(this.props.user.id).then(data => this.setState({
                mesArticles : data,
                isLoading : false,
                index : 1
            }))
        }
    }

    _displayMesArticles () {
        if(this.props.user !== undefined) {
            this._loadMesArticles()
            if(this.state.mesArticles !== null) {
                return (
                    <ArticleList
                        navigation={this.props.navigation}
                        articles={this.state.mesArticles}
                        isLoading={this.state.isLoading}
                    />
                )
            }
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
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MesArticles)
