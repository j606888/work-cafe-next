import create from "zustand"

export const PANEL_TYPES = {
  INIT: "INIT",
  STORE_LIST: "STORE_LIST",
  STORE_DETAIL: "STORE_DETAIL"
}

const store = create((set) => ({
  map: null,
  setMap: (map) => set((state) => ({ ...state, map })),
  panelType: PANEL_TYPES.INIT,
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
  focusPlaceId: null,
  setFocusPlaceId: (focusPlaceId) =>
    set((state) => ({
      ...state,
      focusPlaceId,
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
