import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import base64 from 'react-native-base64'
import { getUserIfConnected } from '../Api/connexionApi'
import { connect } from 'react-redux'

class Connexion extends React.Component {

    constructor() {
        super()
        this.passwordText = ""
        this.userMailText = ""
        this.index = 0
        this.state = {
            user: undefined,
            isConnectionFail: false
        }
    }

    _encryptPassword() {
        let password = this.passwordText
        let userMail = this.userMailText
        let hash = base64.encode(password)
        this._verifConnexion(userMail, hash)
    }

    _verifConnexion (mail, password) {
        getUserIfConnected(mail, password).then(data => this.setState({
            user: data[0],
            isConnectionFail: true
        }))
    }

    _toggleUser() {
        const action = { type: "TOGGLE_USER", value: this.state.user }
        this.props.dispatch(action)
    }

    _passwordTextInputChanged(text) {
        this.passwordText = text
    }

    _displayErreur () {
        if(this.state.isConnectionFail){
            return {
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 5,
                color: 'red'
            }
        }
        return {
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 5,
            color: 'white'
        }
    }

    _userMailTextInputChanged(text) {
        this.userMailText = text
    }

    _displayConnexionComponent() {
        if(this.state.user === undefined) {
            this.index = 0
        }
        else if (this.state.isConnectionFail) {
            this.index = 0
            this.setState({
                isConnectionFail: false
            })
        }
        else {
            if(this.index === 0){
                this._toggleUser()
                this.index += 1
            }
            this.props.navigation.navigate('MesArticles')
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                {this._displayConnexionComponent()}
                <View style={styles.image}>
                    <Image
                        style={styles.image_connexion}
                        source={require('../Images/account.png')}
                    />
                </View>
                <Text style={this._displayErreur()}>Adresse mail ou mot de passe incorrect !</Text>
                <View style={styles.username_connexion}>
                    <Image
                        style={styles.image_username}
                        source={require('../Images/user.png')}
                    />
                    <TextInput
                        style={styles.textConnexion}
                        placeholder='Adresse mail'
                        placeholderTextColor={'#4e94f3'}
                        onChangeText={(text) => this._userMailTextInputChanged(text)}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.password_connexion}>
                    <Image
                        style={styles.image_password}
                        source={require('../Images/lock.png')}
                    />
                    <TextInput
                        style={styles.textConnexion}
                        placeholder='Mot de passe'
                        placeholderTextColor={'#4e94f3'}
                        secureTextEntry={true}
                        onChangeText={(text) => this._passwordTextInputChanged(text)}
                        autoCapitalize='none'
                    />
                </View>
                <TouchableOpacity
                    style={styles.bouton_connexion}
                    onPress={() => {
                        this.index = 1
                        this._encryptPassword()
                    }}
                >
                    <Text style={styles.textButon}>Connexion</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image_connexion: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150
    },
    bouton_connexion: {
        borderRadius: 50,
        borderWidth :2,
        marginBottom: 10,
        borderColor: '#4e94f3',
        width: 320,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#4e94f3'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10
    },
    textButon: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    textConnexion: {
        textAlign: 'center',
        marginTop: 10,
        flex: 10,
        marginRight: 25,
        color: '#4e94f3'
    },
    username_connexion: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4e94f3',
        borderWidth: 2,
        borderRadius: 50,
        marginBottom: 25,
        marginTop: 25,
        width: 320,
        height: 50,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    password_connexion: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4e94f3',
        borderWidth: 2,
        borderRadius: 50,
        marginBottom: 25,
        width: 320,
        height: 50,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    image_username: {
        width: 25,
        height: 25,
        flex: 1,
        marginLeft: 10
    },
    image_password: {
        width: 25,
        height: 25,
        flex: 1,
        marginLeft: 10
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Connexion)
