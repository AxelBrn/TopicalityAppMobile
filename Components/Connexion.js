import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground} from 'react-native';

class Connexion extends React.Component {

    render() {
        return (
                <View style={{backgroundColor:'white', flex:1}}>
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
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.bouton_connexion}>
                        <Text style={styles.textButon}>Login Now</Text>
                    </TouchableOpacity>
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

export default Connexion
