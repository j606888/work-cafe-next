import create from "zustand"

const INIT_FILTERS = {
  openType: "NONE",
  openWeek: 0,
  openHour: 99,
  recommend: null,
  wakeUp: false,
  reviewOver: false,
  tagIds: [],
}

const useFilterStore = create((set) => ({
  filters: INIT_FILTERS,
  setFilters: (filters) => set({ filters }),
}))

export default useFilterStore
