import React from 'react'
import {StyleSheet, Text, View} from 'react-native';

class MesInformations extends React.Component {

    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.text}>Functionality will be added in the future</Text>
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

export default MesInformations