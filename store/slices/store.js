import { createSlice } from "@reduxjs/toolkit"

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    bouncePlaceId: null,
    placeId: null,
  },
  reducers: {
    updateFocusPlaceId: (state, action) => {
      state.bouncePlaceId = action.payload
    },
    updatePlaceId: (state, action) => {
      state.placeId = action.payload
    }
  },
})

export const { updatePlaceId, updateFocusPlaceId } =
  storeSlice.actions

export default storeSlice.reducer
