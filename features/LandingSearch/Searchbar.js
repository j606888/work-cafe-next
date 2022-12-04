import React, { useState } from "react"
import styled from "styled-components"
import useSWR from "swr"
import Option from "./Option"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"

const Searchbar = () => {
  const { searchHints, hints, keyword } = useHintSearch()
  const [showOptions, setShowOptions] = useState(false)
  const keywordSearch = useLocationParamsStore((state) => state.keywordSearch)
  const { map } = useControlMap()

  const handleSearch = (keyword) => {
    const latLng = map.center.toJSON()
    keywordSearch({ ...latLng, keyword, limit: 30 })
  }

  const onChange = (e) => {
    searchHints(e.target.value)
    setShowOptions(true)
  }

  const handleOptionClick = ({ type, name, address }) => {
    setShowOptions(false)

    if (type === 'district') {
      searchHints(address + name)
      handleSearch(address + name)
    } else {
      searchHints(name)
      handleSearch(address)
    }
  }

  return (
    <Wrapper>
      <Container>
        <Input placeholder="輸入縣市、地區或店名" value={keyword} onChange={onChange} />
        <SearchIcon src="/search-btn.svg" alt="search-btn" onClick={handleSearch} />
      </Container>
      {showOptions && hints?.length > 0 && (
        <Options>
          {hints.map((result) => (
            <Option key={`${result.name}${result.placeId}`} {...result} 
              onClick={() => handleOptionClick(result)}
            />
          ))}
        </Options>
      )}
    </Wrapper>
  )
}

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
    keyword
  }
}

const SearchIcon = styled.img`
  cursor: pointer;
`

const Options = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 68px;
  width: 100%;
  border: 1px solid #afaaa3;
  border-radius: 20px;
  background-color: #ffffff;
  z-index: 1;
  padding: 12px 0;
  overflow: hidden;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #afaaa3;
  border-radius: 20px;
  justify-content: space-between;
  gap: 12px;
`

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  border: none;
  margin-left: 12px;
  outline: none;
`

export default Searchbar
