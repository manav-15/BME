import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Components/Header/userSlice'

export default configureStore({
  reducer: {
    user: userReducer
  }
})