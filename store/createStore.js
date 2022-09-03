import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/search'

export default configureStore({
  reducer: {
    search: searchReducer,
  }
})
