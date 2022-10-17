import create from "zustand"

const useLoginModeStore = create((set) => ({
  mode: null,
  setMode: (mode) => set({ mode }),
}))

export default useLoginModeStore
