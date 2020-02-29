import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
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
                    <Text>Vous n'êtes pas connecté</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Connexion')}
                    >
                        <Text>Se Connecter</Text>
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
            return(
                <ArticleList
                    navigation={this.props.navigation}
                    articles={this.state.mesArticles}
                    isLoading={this.state.isLoading}
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
}
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MesArticles)
