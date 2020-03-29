import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

class NoInternet extends React.Component {

    _setBackgroundColor() {
        return {
            backgroundColor: this.props.color
        }
    }

    render() {
        return (
            <View style={styles.main_view}>
                <Image
                    style={styles.image}
                    source={require('../Images/no-internet.png')}
                />
                <Text style={{fontSize: 15}}> Vous n'êtes pas connecté à internet !</Text>
                <TouchableOpacity
                    style={[styles.button, this._setBackgroundColor()]}
                    onPress={() => this.props.retry(false)}
                >
                    <Text style={styles.text}>Réessayer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 48
    },
    button: {
        borderRadius: 50,
        width: '50%',
        height: 50,
        justifyContent: 'center',
        marginTop: 48
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    }
})

export default NoInternet
