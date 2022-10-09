import create from "zustand"

const useStoreStore = create((set) => ({
  stores: [],
  placeId: null,
  bouncePlaceId: null,
  setStores: (stores) => set({ stores }),
  clearStores: () => set({ stores: [] }),
  setPlaceId: (placeId) => set({ placeId }),
  setBouncePlaceId: (bouncePlaceId) => set({ bouncePlaceId })
}))

export default useStoreStore
