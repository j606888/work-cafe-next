import { useState } from "react"
import useSWR from "swr"

const useHintSearch = () => {
  const [keyword, setKeyword] = useState("")
  const { data } = useSWR(
    keyword.length > 0 ? ["/stores/hint", { keyword }] : null
  )
  const hints = data?.results

  const searchHints = (q) => setKeyword(q)

  return {
    searchHints,
    hints,
    keyword,
  }
}

export default useHintSearch
