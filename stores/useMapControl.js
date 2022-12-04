import create from "zustand"

export const WIDTH = {
  fullWidth: "100%",
  withInfoBox: "calc(100% - 628px)",
}

const useMapControl = create((set) => ({
  width: WIDTH.fullWidth,
  setWidth: (width) => set({ width }),
}))

export default useMapControl
