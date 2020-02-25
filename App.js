
import React from 'react'
import { StyleSheet, View,} from 'react-native'
import Accueil from './Components/accueil'
import articleItem from './Components/articleItem';

const App: () => React$Node = () => {
    return (
        <View>
            <Accueil/>
        </View>
    );
};

const styles = StyleSheet.create({
})

export default App
