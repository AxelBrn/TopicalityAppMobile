import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import { deleteArticle } from '../../Api/articleApi'
import NetInfo from '@react-native-community/netinfo'

class DeletePopUp extends React.Component {

    _setBackgroundColor() {
        return {
            backgroundColor: this.props.color
        }
    }

    _onPressYes() {
        NetInfo.fetch().then(state => {
            if(state.isConnected !== this.props.isConnected){
                this.props.setIsConnected(state.isConnected)
                if(state.isConnected === false){
                    Alert.alert('Pas de connexion', 'Vérifiez votre connexion internet')
                }
            }
            if(state.isConnected){
                deleteArticle(this.props.article)
                this.props.navigation.navigate('MesArticles')
            }
        })
    }

    render() {
        return (
            <View style={styles.vue}>
                <View style={[styles.window, this._setBackgroundColor()]}>
                    <Text style={styles.title}>Supprimer ?</Text>
                    <View style={{flexDirection: 'row',height: '75%'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this._onPressYes()}
                        >
                            <Text style={styles.text_button}>Oui</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.popUpActive(false)}
                        >
                            <Text style={styles.text_button}>Non</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    vue: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(175, 175, 175, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    window: {
        width: 200,
        height: 120,
        borderRadius: 15
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
    },
    button: {
        width: 80,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        alignSelf: 'center'
    },
    text_button: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    }
})

export default DeletePopUp
