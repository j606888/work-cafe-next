import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/search'
import storeReducer from './slices/store'
import mapSearchReducer from './slices/map-search'

export default configureStore({
  reducer: {
    search: searchReducer,
    store: storeReducer,
    mapSearch: mapSearchReducer,
  }
})
