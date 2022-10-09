import create from 'zustand'

const useMapStore = create((set, get) => ({
  map: null,
  mode: 'MAP',
  center: {},
  lastLatLng: null,
  setMap: (map) => set({ map }),
  setMode: (mode) => set({ mode }),
  setCenter: ({ lat, lng }) => set({ center: { lat, lng }}),
  setLastLatLng: (latLng) => set({ lastLatLng: latLng}),
  moveMap: (latLng) => {
    get().map.setZoom(15)
    get().map.panTo(latLng)
  }
}))

export default useMapStore
