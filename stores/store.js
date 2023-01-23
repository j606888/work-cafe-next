import create from 'zustand'

const store = create((set) => ({
  map: null,
  setMap: (map) => set({ map }),
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
