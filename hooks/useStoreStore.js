import create from "zustand"

const useStoreStore = create((set) => ({
  stores: [],
  setStores: (stores) => set({ stores }),
  clearStores: () => set({ stores: [] }),
}))

export default useStoreStore
