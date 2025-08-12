import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './slices/todosSlice.js'
import authReducer from './slices/authSlice.js'
// import { api } from '../utils/api';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    // [api.reducerPath]: api.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(api.middleware),
})
