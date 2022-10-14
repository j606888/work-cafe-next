import create from "zustand"

const useMapStoreV2 = create((set, get) => ({
  map: null,
  center: null,
  myLocation: null,
  setMap: (map) => set({ map }),
  setCenter: (latLng) => set({ center: latLng }),
  setMyLocation: (latLng) => set({ myLocation: latLng })
}))

export default useMapStoreV2
