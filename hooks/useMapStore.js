import create from 'zustand'

const useMapStore = create((set) => ({
  mode: 'MAP',
  center: {},
  moveMap: false,
  setMode: (mode) => set({ mode }),
  setMoveMap: (moveMap) => set({ moveMap }),
  setCenter: ({ lat, lng }) => set({ center: { lat, lng }})
}))

export default useMapStore
