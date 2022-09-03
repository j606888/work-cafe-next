import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    keyword: '',
    openType: 'NONE',
    openWeek: null,
    openHour: null,
  },
  reducers: {
    updateKeyword: (state, action) => {
      state.keyword = action.payload
    },
    updateOpenFilter: (state, action) => {
      const { openType, openWeek, openHour } = action.payload
      state.openType = openType
      state.openWeek = openWeek
      state.openHour = openHour
    }
  }
})

export const { updateKeyword, updateOpenFilter } = searchSlice.actions

export default searchSlice.reducer
