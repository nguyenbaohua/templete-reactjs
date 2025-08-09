import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './slices/todosSlice.js'
// import authReducer from './slices/authSlice.js'

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    todos: todosReducer,
  },
})
