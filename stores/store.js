import create from "zustand"

const store = create((set) => ({
  map: null,
  setMap: (map) => set((state) => ({ ...state, map })),
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
  focusPlaceId: null,
  setFocusPlaceId: (focusPlaceId) =>
    set((state) => ({
      ...state,
      focusPlaceId,
    })),
  bouncePlaceId: null,
  setBouncePlaceId: (bouncePlaceId) =>
    set((state) => ({
      ...state,
      bouncePlaceId,
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
