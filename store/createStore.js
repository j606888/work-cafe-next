import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/search'
import storeReducer from './slices/store'

export default configureStore({
  reducer: {
    search: searchReducer,
    store: storeReducer,
  }
})
