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
  // setMapCenter: (center) => set(state =>({
  //   ...state,
  //   map: {
  //     ...state.map,
  //     center
  //   }
  // })),
  // setMapZoom: (zoom) => set(state =>({
  //   ...state,
  //   map: {
  //     ...state.map,
  //     zoom
  //   }
  // }))
}))

export default store
