import { createContext, useState } from "react"

const FilterContext = createContext({
  keyword: '',
  setKeyword: () => {},
  openTime: {},
  setOpenTime: () => {},
})

export function FilterProvider({ children }) {
  const [keyword, setKeyword] = useState('')
  const [openTime, setOpenTime] = useState({})

  const value = {
    keyword,
    setKeyword,
    openTime,
    setOpenTime
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContext
