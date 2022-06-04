import { configureStore } from '@reduxjs/toolkit'
import balanceReducer from '../features/balance/balanceSlice'
import userReducer from '../features/user/userSlice'


export default configureStore({
  reducer: {
    balance: balanceReducer,
    user: userReducer
  },
})