import create from "zustand"

const useStoreStore = create((set) => ({
  stores: null,
  placeId: null,
  bouncePlaceId: null,
  focusPlaceId: null,
  setStores: (stores) => set({ stores }),
  clearStores: () => set({ stores: null }),
  setPlaceId: (placeId) => set({ placeId }),
  setBouncePlaceId: (bouncePlaceId) => set({ bouncePlaceId }),
  setFocusPlaceId: (focusPlaceId) => set({ focusPlaceId})
}))

export default useStoreStore
