// Store/configureStore.js

import { createStore } from 'redux';
import toggleUser from './Reducers/userReducer'
import { persistReducer  } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(persistReducer(rootPersistConfig, toggleUser))
