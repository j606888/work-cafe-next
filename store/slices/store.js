import { createSlice } from "@reduxjs/toolkit"

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    stores: [],
    bouncePlaceId: null,
    placeId: null,
  },
  reducers: {
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

export const { updateStores, updatePlaceId, updateFocusPlaceId } =
  storeSlice.actions

export default storeSlice.reducer
