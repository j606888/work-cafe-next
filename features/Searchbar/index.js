import React, { useState, useMemo } from "react"
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Place as PlaceIcon,
  Circle as CircleIcon,
  Store as StoreIcon,
  Clear as ClearIcon,
} from "@mui/icons-material"
import { Divider, Tooltip } from "@mui/material"
import useSWR from "swr"
import { fetcher } from "api"
import { Container, SearchBox, Input, Options, Option } from "./styled"
import { useEffect } from "react"
import { useRef } from "react"
import useKeyword from "stores/useKeyword"

const pointer = {
  cursor: "pointer",
}

const searchIconStyle = {
  backgroundColor: '#757575',
  color: '#fff',
  padding: '6px',
  borderRadius: '8px',
}

const CityOption = ({ type, name, count, address }) => {
  return type === "store" ? (
    <>
      <StoreIcon />
      <div className="hidden">
        <span>{name}</span>
        <span className="address">{address}</span>
      </div>
    </>
  ) : (
    <>
      <PlaceIcon />
      <div className="city-name">
        <span>{name}</span>
        <span className="address">{address}</span>
      </div>
      <CircleIcon />
      <span className="city-count">{count}</span>
    </>
  )
}

const Searchbar = ({ onSearch = () => {} }) => {
  const keyword = useKeyword(state => state.keyword)
  const setKeyword = useKeyword(state => state.setKeyword)
  const [isOnComposition, setIsOnComposition] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const resultContainer = useRef(null)

  const { data } = useSWR(
    keyword.length > 0 ? ["/stores/hint", { keyword }] : null,
    fetcher
  )
  const options = useMemo(() => {
    return data?.results || []
  }, [data])
  const hasResult = showOptions && options.length > 0

  function handleOptionClick({ type, name, address }) {
    if (type === 'district') {
      setKeyword(address + name)
      onSearch(address + name)
    } else {
      setKeyword(name)
      onSearch(name)
    }
    setShowOptions(false)
  }

  function handleSearch() {
    setShowOptions(false)
    onSearch(keyword)
  }

  function handleClear() {
    setShowOptions(false)
    setKeyword("")
    onSearch("")
  }

  function handleChange(e) {
    setKeyword(e.target.value)
  }

  function handleComposition(e) {
    if (e.type === "compositionend") {
      setIsOnComposition(false)
    } else {
      setIsOnComposition(true)
    }
  }

  function handleBlue() {
    setTimeout(() => {
      setShowOptions(false)
      setFocusedIndex(-1)
    }, [100])
  }

  function handleKeyDown(e) {
    if (isOnComposition) return
    setShowOptions(true)

    const { key } = e
    const nextIndexCount = _calcIndexCount({ key, focusedIndex, options })
    if (Number.isInteger(nextIndexCount)) {
      setFocusedIndex(nextIndexCount)
      e.preventDefault()
    }

    if (!isOnComposition && e.key === "Enter") {
      const answer = options[focusedIndex]
      const name = answer?.name || keyword
      if (answer?.type === 'district') {
        setKeyword(answer.address + answer.name)
        onSearch(answer.address + answer.name)
      } else {
        setKeyword(name)
        onSearch(name)
      }
      setShowOptions(false)
    }
  }

  useEffect(() => {
    if (!resultContainer.current) return

    resultContainer.current.scrollIntoView({
      block: "center",
    })
  }, [focusedIndex])

  return (
    <Container onBlur={handleBlue}>
      <SearchBox hasResult={hasResult}>
        <Input
          value={keyword}
          onChange={handleChange}
          onClick={() => setShowOptions(true)}
          onKeyDown={handleKeyDown}
          placeholder="搜尋縣市、地區或店名"
          onCompositionStart={handleComposition}
          onCompositionUpdate={handleComposition}
          onCompositionEnd={handleComposition}
        />
        {keyword && (
          <>
            <Tooltip title="清除" onClick={handleClear}>
              <ClearIcon style={pointer} sx={{ color: '#757575'}}/>
            </Tooltip>
          </>
        )}
        <SearchIcon style={pointer} onClick={handleSearch} sx={searchIconStyle} />
      </SearchBox>
      <Options hasResult={hasResult}>
        {options.map((option, index) => (
          <Option
            key={_optionKey(option)}
            onClick={() => handleOptionClick(option)}
            ref={index === focusedIndex ? resultContainer : null}
            focus={index === focusedIndex}
          >
            <CityOption {...option} />
          </Option>
        ))}
      </Options>
    </Container>
  )
}

export default Searchbar

function _optionKey({ name, count, placeId }) {
  return `${name}${count}${placeId}`
}

function _calcIndexCount({ key, focusedIndex, options }) {
  if (key === "ArrowUp") {
    return (focusedIndex + options.length - 1) % options.length
  }
  if (key === "ArrowDown") {
    return (focusedIndex + 1) % options.length
  }

  return null
}
