import { useState } from "react"
import useOutsideClick from "src/hooks/useOutsideClick"
import styled from "styled-components"
import React from "react"
import AutoComplete from "./AutoComplete"
import Filter from "./Filter"

const AreaMap = [
  '台北市', '台南市', '高雄市', '新竹市'
]

const Hi = styled.div`
  position: relative;
`

const SearchBar = () => {
  const [showAutoComplete, setShowAutoComplete] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  const autoCompleteRef = useOutsideClick(() => setShowAutoComplete(false))
  const filterRef = useOutsideClick(() => setShowFilter(false))

  return (
    <Hi>
      <SearchBarContainer>
        <div>
          <Circle />
          <TextSearch
            ref={autoCompleteRef}
            type="text"
            placeholder="找哪裡的咖啡店？"
            onClick={() => setShowAutoComplete(true)}
          />
        </div>
        <Splitter />
        <div>
          <Circle />
          <button className="filter" onClick={() => setShowFilter(true)}>
            營業時間 (預設不限)
          </button>
          <button className="search-btn">搜尋</button>
        </div>
      </SearchBarContainer>
      {showAutoComplete && <AutoComplete texts={AreaMap} keyword="台" />}
      {showFilter && <Filter ref={filterRef} />}
    </Hi>
  )
}

const SearchBarContainer = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > div {
    flex: 1;
    display: flex;
    gap: 6px;
    align-items: center;

    .filter {
      flex: 1;
      text-align: left;
      background: none;
      border: none;
      color: #757575;
    }
    .search-btn {
      border: none;
      background-color: #d9d9d9;
      color: #fff;
      border-radius: 8px;
      padding: 6px 18px;
      font-size: 16px;
    }
  }
`

const TextSearch = styled.input`
  border: none;
  color: #757575;
  &:focus {
    outline: none;
  }
`

const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-left: 8px;
`

const Splitter = styled.span`
  border-left: 1px solid #757575;
  height: 32px;
  margin-left: 4px;
  padding-right: 4px;
`

export default SearchBar
