import React, { useState, useMemo } from "react"
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Place as PlaceIcon,
  Circle as CircleIcon,
  Store as StoreIcon,
} from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import useSWR from "swr"
import { fetcher } from "api"
import { Container, SearchBox, Input, Options, Option } from "./styled"
import { useEffect } from "react"
import { useRef } from "react"

const pointer = {
  cursor: "pointer",
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
      <span className="city-name">{name}</span>
      <CircleIcon />
      <span className="city-count">{count}</span>
    </>
  )
}

const SearchbarV2 = ({ onSearch = () => {} }) => {
  const [keyword, setKeyword] = useState("")
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

  function handleOptionClick(name) {
    setKeyword(name)
    onSearch(name)
    setShowOptions(false)
  }

  function handleKeyDown(e) {
    if (isOnComposition) return
    setShowOptions(true)

    const { key} = e

    let nextIndexCount = 0
    if (key === 'ArrowUp') {
      nextIndexCount = (focusedIndex + options.length - 1) % options.length
      e.preventDefault()
    }

    if (key === 'ArrowDown') {
      nextIndexCount = (focusedIndex + 1) % options.length
      e.preventDefault()
    }

    setFocusedIndex(nextIndexCount)

    if (!isOnComposition && e.key === "Enter") {
      const answer = options[focusedIndex].name
      setKeyword(answer)
      onSearch(answer)
      setShowOptions(false)
    }
  }

  useEffect(() => {
    if (!resultContainer.current) return

    resultContainer.current.scrollIntoView({
      block: 'center'
    })
  }, [focusedIndex])

  function handleChange(e) {
    setKeyword(e.target.value)
  }

  const handleComposition = (e) => {
    if (e.type === "compositionend") {
      setIsOnComposition(false)
    } else {
      setIsOnComposition(true)
    }
  }

  return (
    <Container>
      <SearchBox hasResult={hasResult}>
        <Tooltip title="選單">
          <MenuIcon style={pointer} />
        </Tooltip>
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
        <Tooltip title="搜尋">
          <SearchIcon style={pointer} />
        </Tooltip>
      </SearchBox>
      <Options hasResult={hasResult}>
        {options.map((option, index) => (
          <Option
            key={_optionKey(option)}
            onClick={() => handleOptionClick(option.name)}
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

export default SearchbarV2

function _optionKey({ name, count, placeId }) {
  return `${name}${count}${placeId}`
}
