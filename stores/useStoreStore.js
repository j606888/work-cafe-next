import create from "zustand"

const useStoreStore = create((set) => ({
  placeId: null,
  bouncePlaceId: null,
  focusPlaceId: null,
  setPlaceId: (placeId) => set({ placeId }),
  setBouncePlaceId: (bouncePlaceId) => set({ bouncePlaceId }),
  setFocusPlaceId: (focusPlaceId) => set({ focusPlaceId }),
}))

export default useStoreStore
