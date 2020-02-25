
import React from 'react'
import { StyleSheet, View,} from 'react-native'
import Accueil from './Components/accueil'

const App: () => React$Node = () => {
    return (
        <View style={styles.app}>
            <Accueil/>
        </View>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: 'center'
    }

})

export default App
