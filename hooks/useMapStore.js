import create from 'zustand'

const useMapStore = create((set) => ({
  mode: 'MAP',
  setMode: (mode) => set({ mode })
}))

export default useMapStore
