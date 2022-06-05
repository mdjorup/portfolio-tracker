import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import balanceReducer from '../features/balance/balanceSlice'
import userReducer from '../features/user/userSlice'


const reducers = combineReducers({
  balance: balanceReducer,
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer
})


export default store;