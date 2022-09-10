import { createSlice } from '@reduxjs/toolkit'

export const storeSlice = createSlice({
  name: 'store',
  initialState: {
    mode: 'MAP',
    stores: []
  },
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload
    },
    updateStores: (state, action) => {
      state.stores = action.payload
    }
  }
})

export const { changeMode, updateStores } = storeSlice.actions

export default storeSlice.reducer
