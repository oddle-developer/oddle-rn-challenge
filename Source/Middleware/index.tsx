import { persistCombineReducers, PersistedState } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import productReducers from './product'

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
}
const reducers = persistCombineReducers<PersistedState>(config, {
  productReducers,
})

export default reducers
