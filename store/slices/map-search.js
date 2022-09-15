import { createSlice } from "@reduxjs/toolkit"

export const mapSearchSlice = createSlice({
  name: "map-search",
  initialState: {
    options: {
      keyword: "",
      openType: "NONE",
      openWeek: null,
      openHour: null,
      go: false,
    }
  },
  reducers: {
    updateOptions: (state, action) => {
      state.options = { ...state.options, ...action.payload, go: true }
    },
    clearKeyword: (state, action) => {
      state.options = { ...state.options, keyword: "", go: false }
    },
  },
})

export const { updateOptions, clearKeyword } = mapSearchSlice.actions

export default mapSearchSlice.reducer
