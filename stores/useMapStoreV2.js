import create from "zustand"

const useMapStoreV2 = create((set, get) => ({
  map: null,
  center: null,
  setMap: (map) => set({ map }),
  setCenter: (latLng) => set({ center: latLng })
}))

export default useMapStoreV2
