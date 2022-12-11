import useSWR from "swr"
import create from "zustand"

const useKeyword = create((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
}))

const useHintSearch = () => {
  const keyword = useKeyword((state) => state.keyword)
  const setKeyword = useKeyword((state) => state.setKeyword)
  const queryString = `keyword=${keyword}`
  const { data } = useSWR(keyword ? `/stores/hint?${queryString}` : null)

  const searchHints = (q) => setKeyword(q)

  return {
    searchHints,
    hints: data,
    keyword,
  }
}

export default useHintSearch
