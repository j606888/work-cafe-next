import React, { useState } from "react"
import styled from "styled-components"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import useKeyword from "stores/useKeyword"
import TextInput from "./TextInput"
import OptionList from "./OptionList"
import useFocusIndex from "./useFocusIndex"
import useHintSearch from "./useHintSearch"
import SvgButton from "components/SvgButton"

const Searchbar = ({ type = "landing" }) => {
  const [showOptions, setShowOptions] = useState(false)
  const setKeyword = useKeyword((state) => state.setKeyword)
  const { searchHints, hints, keyword } = useHintSearch()
  const { focusedIndex, onArrowUp, onArrowDown } = useFocusIndex()
  const keywordSearch = useLocationParamsStore((state) => state.keywordSearch)
  const { map } = useControlMap()

  const handleSearch = (keyword) => {
    const latLng = map.center.toJSON()
    keywordSearch({ ...latLng, keyword, limit: 30 })
  }

  const handleCancel = () => {
    setKeyword("")
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
    setKeyword(name)
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
        setKeyword(answer.address + answer.name)
      } else {
        searchHints(name)
        handleSearch(name)
        setKeyword(name)
      }
      setShowOptions(false)
    }
  }

  const textInput = (
    <TextInput
      keyword={keyword}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  )

  return (
    <Wrapper>
      <Container>
        {type === "storeList" && (
          <>
            <SvgButton path="search-btn-outline" onClick={handleSearch} />
            {textInput}
            <SvgButton path="cancel-filled" onClick={handleCancel} />
          </>
        )}
        {type === "landing" && (
          <>
            {textInput}
            <SvgButton path="search-btn" onClick={handleCancel} />
          </>
        )}
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

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 52px;
  padding: 10px;
  border: 1px solid #afaaa3;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
`

export default Searchbar
