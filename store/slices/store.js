import { createSlice } from "@reduxjs/toolkit"

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    mode: "MAP",
    stores: [],
    bouncePlaceId: null,
    placeId: null,
  },
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload
    },
    updateStores: (state, action) => {
      state.stores = action.payload
    },
    updateFocusPlaceId: (state, action) => {
      state.bouncePlaceId = action.payload
    },
    updatePlaceId: (state, action) => {
      state.placeId = action.payload
    }
  },
})

export const { changeMode, updateStores, updatePlaceId, updateFocusPlaceId } =
  storeSlice.actions

export default storeSlice.reducer
