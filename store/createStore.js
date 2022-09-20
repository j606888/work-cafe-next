import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './slices/store'

export default configureStore({
  reducer: {
    store: storeReducer,
  }
})
