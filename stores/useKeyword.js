import create from "zustand"

const useKeyword = create((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
}))

export default useKeyword
