import React, { useState } from "react"
import styled from "styled-components"
import useSWR from "swr"
import Option from "./Option"

const useCustomSearch = () => {
  const [keyword, setKeyword] = useState("")
  const { data } = useSWR(
    keyword.length > 0 ? ["/stores/hint", { keyword }] : null
  )
  const results = data?.results

  const search = (q) => setKeyword(q)

  return {
    search,
    results,
    keyword
  }
}

const Searchbar = ({ onSearch }) => {
  const { search, results, keyword } = useCustomSearch()
  const [showOptions, setShowOptions] = useState(false)

  const handleSearch = () => onSearch(keyword)
  const onChange = (e) => {
    search(e.target.value)
    setShowOptions(true)
  }
  const handleOptionClick = ({ type, name, address }) => {
    setShowOptions(false)

    if (type === 'district') {
      search(address + name)
    } else {
      search(name)
    }
  }

  return (
    <Wrapper>
      <Container>
        <Input placeholder="輸入縣市、地區或店名" value={keyword} onChange={onChange} />
        <SearchIcon src="/search-btn.svg" alt="search-btn" onClick={handleSearch} />
      </Container>
      {showOptions && results?.length > 0 && (
        <Options>
          {results.map((result) => (
            <Option key={`${result.name}${result.placeId}`} {...result} 
              onClick={() => handleOptionClick(result)}
            />
          ))}
        </Options>
      )}
    </Wrapper>
  )
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
