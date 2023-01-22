import create from "zustand"

const usePanelTypeStore = create((set) => ({
  panelType: "INIT",
  setPanelType: (panelType) => set({ panelType }),
}))

export default usePanelTypeStore
