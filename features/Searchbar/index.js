import React, { useState } from "react"
import styled from "styled-components"
import TextInput from "./TextInput"
import OptionList from "./OptionList"
import useFocusIndex from "./useFocusIndex"
import useHintSearch from "./useHintSearch"
import SvgButton from "components/SvgButton"
import { useRouter } from "next/router"
import store from "stores/store"
import { mapCenter } from "utils/map-helper"
import useRWD from "hooks/useRWD"

const Searchbar = ({ type = "landing" }) => {
  const { isFullScreen } = useRWD()
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

  const handleSearch = async (k) => {
    const { lat, lng } = mapCenter(map)
    const { middleLat, middleLng } = await _searchResultMid({ lat, lng, k })

    if (isFullScreen) {
      router.push(`/m/@${middleLat},${middleLng},15z?keyword=${k}`, undefined, {
        shallow: true,
      })
    } else {
      router.push(`/@${middleLat},${middleLng},15z?keyword=${k}`, undefined, {
        shallow: true,
      })
    }

    if (map) {
      map.setZoom(15)
      map.panTo({ lat: middleLat, lng: middleLng })
    }

    setKeyword(k)
    setSearchCenter({ lat: middleLat, lng: middleLng })
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

async function _searchResultMid({ lat, lng, k }) {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST
  const res = await fetch(
    `${API_HOST}/stores/location?lat=${lat}&lng=${lng}&keyword=${k}`
  )
  const data = await res.json()
  const stores = data.stores

  let latSum = 0
  let lngSum = 0

  stores.forEach((store) => {
    latSum += store.lat
    lngSum += store.lng
  })

  return {
    middleLat: +(latSum / stores.length).toFixed(6),
    middleLng: +(lngSum / stores.length).toFixed(6),
  }
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
