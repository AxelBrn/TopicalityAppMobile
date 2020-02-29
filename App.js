
import React from 'react'
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

const App: () => React$Node = () => {
    return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
    );
};

const styles = StyleSheet.create({
})

export default App
