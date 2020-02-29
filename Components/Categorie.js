import React from 'react'
import {StyleSheet, Text, View} from 'react-native';

class Categorie extends React.Component {

    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.text}>{this.props.route.params.libelleCateg}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center'
    }
})

export default Categorie
