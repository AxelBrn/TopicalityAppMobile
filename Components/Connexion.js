import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native'
import base64 from 'react-native-base64'
import { getUserIfConnected } from '../Api/connexionApi'
import { connect } from 'react-redux'

class Connexion extends React.Component {

    constructor() {
        super()
        this.passwordText = ""
        this.userMailText = ""
        this.index = 0
        this.state = { user: undefined}
    }

    _encryptPassword() {
        let password = this.passwordText
        let userMail = this.userMailText
        let hash = base64.encode(password)
        this._verifConnexion(userMail, hash)
    }

    _verifConnexion (mail, password) {
        getUserIfConnected(mail, password).then(data => this.setState({
            user: data[0]
        }))
    }

    _toggleUser() {
        const action = { type: "TOGGLE_USER", value: this.state.user }
        this.props.dispatch(action)
    }

    _passwordTextInputChanged(text) {
        this.passwordText = text
    }

    _userMailTextInputChanged(text) {
        this.userMailText = text
    }

    _displayConnexionComponent() {
        if(this.state.user === undefined) {
            this.index = 0
            return (
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <View style={styles.image}>
                        <Image
                            style={styles.image_connexion}
                            source={require('../Images/logo-compte.png')}
                        />
                    </View>
                    <View style={styles.username_connexion}>
                        <Image
                            style={styles.image_username}
                            source={require('../Images/user.png')}
                        />
                        <TextInput
                            style={styles.textConnexion}
                            placeholder='Username'
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
                            placeholder='Password'
                            placeholderTextColor={'#4e94f3'}
                            secureTextEntry={true}
                            onChangeText={(text) => this._passwordTextInputChanged(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.bouton_connexion}
                        onPress={() => this._encryptPassword()}
                    >
                        <Text style={styles.textButon}>Login Now</Text>
                    </TouchableOpacity>
                </View>
            )
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
            <View style={{flex:1}}>
                {this._displayConnexionComponent()}
            </View>
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
        color: 'white'
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
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Connexion)
