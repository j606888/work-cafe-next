import create from "zustand"
import useMapControl, { WIDTH } from "stores/useMapControl"

const useLocationParamsStore = create((set, get) => ({
  params: {},
  searchHere: ({ lat, lng }) => {
    const params = get().params
    const newParams = { ...params, keyword: "", lat, lng, moveAfter: false }
    set({ params: newParams })
  },
  keywordSearch: (settings) => {
    const params = get().params
    const newParams = { ...params, ...settings, moveAfter: true }
    set({ params: newParams })
    useMapControl.getState().setWidth(WIDTH.withInfoBox)
  },
  updateSettings: (settings) => {
    const { keyword, lat, lng } = get().params
    const newParams = {
      ...settings,
      keyword,
      lat,
      lng,
      moveAfter: false,
    }
    set({ params: newParams })
  },
  clear: () => set({ params: {} })
}))

export default useLocationParamsStore
