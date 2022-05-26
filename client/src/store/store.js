import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import deviceReducer from './reducers/deviceReducer'
import message from './reducers/messageReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
    message: message
  },
})
