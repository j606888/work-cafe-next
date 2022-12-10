import React, { useState, useRef } from "react"
import styled from "styled-components"
import useSWR from "swr"
import Option from "./Option"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import useKeyword from "stores/useKeyword"

const Searchbar = ({ type = "landing" }) => {
  const setKeyword = useKeyword((state) => state.setKeyword)
  const { searchHints, hints, keyword } = useHintSearch()
  const [showOptions, setShowOptions] = useState(false)
  const keywordSearch = useLocationParamsStore((state) => state.keywordSearch)
  const [isOnComposition, setIsOnComposition] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

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

  const onChange = (e) => {
    searchHints(e.target.value)
    setShowOptions(true)
  }

  function handleComposition(e) {
    setIsOnComposition(e.type !== "compositionend")
  }

  const handleOptionClick = ({ type, name, address }) => {
    setShowOptions(false)

    const keyword = type === "district" ? address + name : name
    searchHints(keyword)
    handleSearch(keyword)
    setKeyword(keyword)
  }

  function handleKeyDown(e) {
    if (isOnComposition) return
    setShowOptions(true)

    const { key } = e
    let nextIndexCount
    switch (key) {
      case "ArrowUp":
        nextIndexCount = (focusedIndex + hints?.length - 1) % hints?.length
        if (Number.isInteger(nextIndexCount)) setFocusedIndex(nextIndexCount)
        e.preventDefault()
        break
      case "ArrowDown":
        nextIndexCount = (focusedIndex + 1) % hints?.length
        if (Number.isInteger(nextIndexCount)) setFocusedIndex(nextIndexCount)
        e.preventDefault()
        break
      case "Enter":
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
        break
    }
  }

  const inputBox = (
    <Input
      placeholder="輸入縣市、地區或店名"
      value={keyword}
      onChange={onChange}
      onCompositionStart={handleComposition}
      onCompositionUpdate={handleComposition}
      onCompositionEnd={handleComposition}
      onKeyDown={handleKeyDown}
      marginLeft={type === "landing" ? "12px" : "0px"}
    />
  )

  return (
    <Wrapper>
      <Container>
        {type === "storeList" && (
          <>
            <ClickIcon
              src="/search-btn-outline.svg"
              alt="search-btn"
              onClick={handleSearch}
            />
            {inputBox}
            <ClickIcon
              src="/cancel-filled.svg"
              alt="cancel-btn"
              onClick={handleCancel}
              width={28}
              height={28}
            />
          </>
        )}

        {type === "landing" && (
          <>
            {inputBox}
            <ClickIcon
              src="/search-btn.svg"
              alt="search-btn"
              onClick={handleSearch}
            />
          </>
        )}
      </Container>
      {showOptions && hints?.length > 0 && (
        <Options>
          {hints.map((result, index) => (
            <Option
              key={`${result.name}${result.placeId}`}
              {...result}
              onClick={() => handleOptionClick(result)}
              focus={index === focusedIndex}
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
    keyword,
  }
}

const ClickIcon = styled.img`
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
  align-items: center;
  gap: 8px;
`

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  border: none;

  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}
  outline: none;
`

export default Searchbar
