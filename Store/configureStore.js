// Store/configureStore.js

import { createStore } from 'redux';
import toggleUser from './Reducers/userReducer'

export default createStore(toggleUser)
