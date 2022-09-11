import { createSlice } from "@reduxjs/toolkit"

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    mode: "MAP",
    stores: [],
    store: null,
    bouncePlaceId: null,
  },
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload
    },
    updateStores: (state, action) => {
      state.stores = action.payload
    },
    updateStore: (state, action) => {
      state.store = action.payload
    },
    updateFocusPlaceId: (state, action) => {
      state.bouncePlaceId = action.payload
    },
  },
})

export const { changeMode, updateStores, updateStore, updateFocusPlaceId } =
  storeSlice.actions

export default storeSlice.reducer
