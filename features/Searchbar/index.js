import React, { useState } from "react"
import styled from "styled-components"
import TextInput from "./TextInput"
import OptionList from "./OptionList"
import useFocusIndex from "./useFocusIndex"
import useHintSearch from "./useHintSearch"
import SvgButton from "components/SvgButton"
import { useRouter } from "next/router"
import store, { PANEL_TYPES } from "stores/store"
import { mapCenter } from "utils/map-helper"

const Searchbar = ({ type = "landing" }) => {
  const router = useRouter()
  const [showOptions, setShowOptions] = useState(false)
  const { searchHints, hints, keyword } = useHintSearch()
  const { focusedIndex, onArrowUp, onArrowDown } = useFocusIndex()
  const { map, setPanelType, setKeyword, setSearchCenter } = store((state) => ({
    map: state.map,
    setPanelType: state.setPanelType,
    setKeyword: state.setKeyword,
    setSearchCenter: state.setSearchCenter,
  }))

  const handleSearch = (k) => {
    const { lat, lng } = mapCenter(map)
    const url = new URL(window.location.href)
    const path = url.pathname
    router.push(`${path}?keyword=${k}`)

    setKeyword(k)
    setSearchCenter({ lat, lng })
  }

  const handleCancel = () => {
    searchHints("")
    setShowOptions(false)
  }

  const onChange = (value) => {
    searchHints(value)
    setShowOptions(true)
  }

  const handleOptionClick = (name) => {
    setShowOptions(false)
    searchHints(name)
    handleSearch(name)
  }

  const handleIconSearch = () => {
    handleSearch(keyword)
  }

  function handleKeyDown(key) {
    setShowOptions(true)

    if (key === "ArrowUp") onArrowUp(hints?.length)
    if (key === "ArrowDown") onArrowDown(hints?.length)
    if (key === "Enter" && !!hints) {
      const answer = hints[focusedIndex]
      const name = answer?.name || keyword
      if (answer?.type === "district") {
        searchHints(answer.address + answer.name)
        handleSearch(answer.address + answer.name)
      } else {
        searchHints(name)
        handleSearch(name)
      }
      setShowOptions(false)
    }
  }

  return (
    <Wrapper>
      <Container>
        <SearchBox
          type={type}
          onSearch={handleIconSearch}
          onCancel={handleCancel}
        >
          <TextInput
            keyword={keyword}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setShowOptions(false)}
          />
        </SearchBox>
      </Container>
      <OptionList
        show={showOptions}
        hints={hints}
        focusedIndex={focusedIndex}
        onClick={handleOptionClick}
      />
    </Wrapper>
  )
}

const SearchBox = ({ type, children, onSearch, onCancel }) => {
  if (type === "storeList")
    return (
      <>
        <SvgButton path="search-btn-outline" onClick={onSearch} />
        {children}
        <SvgButton path="cancel-filled" onClick={onCancel} />
      </>
    )
  if (type === "landing")
    return (
      <>
        &nbsp;
        {children}
        <SvgButton path="search-btn" onClick={onSearch} />
      </>
    )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 52px;
  padding: 0 8px 0 10px;
  border: 1px solid #afaaa3;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
`

export default Searchbar
