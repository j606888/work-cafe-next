import create from 'zustand'

const useMapStore = create((set) => ({
  mode: 'MAP',
  center: {},
  lastLatLng: null,
  moveMap: false,
  setMode: (mode) => set({ mode }),
  setMoveMap: (moveMap) => set({ moveMap }),
  setCenter: ({ lat, lng }) => set({ center: { lat, lng }}),
  setLastLatLng: (latLng) => set({ lastLatLng: latLng})
}))

export default useMapStore
