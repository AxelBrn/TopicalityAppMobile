import React from 'react'
import {StyleSheet, Text} from 'react-native'

class Accueil extends React.Component {

    render() {
        return (
            <Text style={styles.texte}>Insert Code Here</Text>
        )
    }
}

const styles = StyleSheet.create({
    texte: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 40
    }
});

export default Accueil
