import React from 'react'
import {StyleSheet, TouchableOpacity, Image } from 'react-native';

class ButtonAdd extends React.Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('AddArticle', {idUser: this.props.user})}
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
