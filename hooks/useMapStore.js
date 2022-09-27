import create from 'zustand'

const useMapStore = create((set) => ({
  mode: 'MAP',
  moveMap: false,
  setMode: (mode) => set({ mode }),
  setMoveMap: (moveMap) => set({ moveMap })
}))

export default useMapStore
