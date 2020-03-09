
import React from 'react'
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

const App: () => React$Node = () => {
    let persistor = persistStore(Store);
    return (
        <Provider store={Store}>
            <PersistGate persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
})

export default App
