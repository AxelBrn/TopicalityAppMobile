
import React from 'react'
import 'react-native-gesture-handler';
import { StyleSheet, View,} from 'react-native'
import Accueil from './Components/Accueil'
import articleItem from './Components/ArticleItem';
import Navigation from './Navigation/Navigation';

const App: () => React$Node = () => {
    return (
        <Navigation/>
    );
};

const styles = StyleSheet.create({
})

export default App
