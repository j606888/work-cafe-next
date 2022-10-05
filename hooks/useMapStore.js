import create from 'zustand'

const useMapStore = create((set) => ({
  mode: 'MAP',
  center: {},
  lastLatLng: {},
  moveMap: false,
  setMode: (mode) => set({ mode }),
  setMoveMap: (moveMap) => set({ moveMap }),
  setCenter: ({ lat, lng }) => set({ center: { lat, lng }}),
  setLastLatLng: ({ lat, lng }) => set({ lastLatLng: { lat, lng }})
}))

export default useMapStore
