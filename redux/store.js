import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/SearchSlice'

export default configureStore({
  reducer: {
    search: searchReducer,
  }
})
