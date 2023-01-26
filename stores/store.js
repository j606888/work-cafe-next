import create from "zustand"

const store = create((set) => ({
  map: null,
  setMap: (map) => set((state) => ({ ...state, map })),
  panelType: "INIT",
  setPanelType: (panelType) =>
    set((state) => ({
      ...state,
      panelType,
    })),
  myLocation: null,
  setMyLocation: (myLocation) =>
    set((state) => ({
      ...state,
      myLocation,
    })),
  placeId: null,
  setPlaceId: (placeId) =>
    set((state) => ({
      ...state,
      placeId,
    })),
  keyword: null,
  setKeyword: (keyword) =>
    set((state) => ({
      ...state,
      keyword,
    })),
  showLabel: true,
  setShowLabel: (showLabel) =>
    set((state) => ({
      ...state,
      showLabel,
    })),
  searchCenter: { lat: null, lng: null },
  setSearchCenter: (searchCenter) =>
    set((state) => ({
      ...state,
      searchCenter,
    })),
}))

export default store
