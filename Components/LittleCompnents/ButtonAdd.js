import React from 'react'
import {StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo'

class ButtonAdd extends React.Component {

    _onPress() {
        NetInfo.fetch().then(state => {
            if(state.isConnected !== this.props.isConnected){
                this.props.setIsConnected(state.isConnected)
                if(state.isConnected === false){
                    Alert.alert('Pas de connexion', 'Vérifiez votre connexion internet')
                }
            }
            if(state.isConnected){
                this.props.navigation.navigate('AddArticle',{idUser: this.props.user})
            }
        })
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this._onPress()}
            >
                <Image
                    source={require('../../Images/edit.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#4e94f3'
    },
    icon: {
        width: 30,
        height: 30,
        alignSelf: 'center'
    }
})

export default ButtonAdd
