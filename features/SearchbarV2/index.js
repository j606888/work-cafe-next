import React, { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { Tooltip } from "@mui/material"
import PlaceIcon from "@mui/icons-material/Place"
import CircleIcon from "@mui/icons-material/Circle"
import StoreIcon from "@mui/icons-material/Store"
import { Container, SearchBox, Input, Options, Option } from "./styled"
import { useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "api"
import { useMemo } from "react"

const pointer = {
  cursor: "pointer",
}

const INIT_OPTIONS = [
  {
    type: "city",
    name: "台北市",
    address: null,
    place_id: null,
    count: 11612,
  },
  {
    type: "city",
    name: "台南市",
    address: null,
    place_id: null,
    count: 5311,
  },
  {
    type: "city",
    name: "台中市",
    address: null,
    place_id: null,
    count: 5118,
  },
  {
    type: "district",
    name: "台東縣",
    address: null,
    place_id: null,
    count: 266,
  },
  {
    type: "district",
    name: "台北縣",
    address: null,
    place_id: null,
    count: 7,
  },
  {
    type: "store",
    name: "台灣益友會（大益茶）",
    address: "10656台灣台北市大安區建國南路一段312號",
    place_id: "ChIJWyMQgtWrQjQRb89-0n2MpuI",
    count: 1,
  },
  {
    type: "store",
    name: "日常生活-推薦下午茶咖啡(台北大安)忠孝復興捷運站 輕食簡餐午餐 蛋糕訂購 蛋糕甜點點心盤 活動會議點心甜點外燴服務",
    address: "106台灣台北市大安區忠孝東路三段217巷8弄20-1號",
    place_id: "ChIJO8aURL-rQjQRkI7Nu-82q00",
    count: 1,
  },
  {
    type: "store",
    name: "一茶工房",
    address: "106台灣台北市大安區永康街14巷1號",
    place_id: "ChIJsaI3EpapQjQReTx7qCQTJQU",
    count: 1,
  },
]

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
    if (!isOnComposition && e.key === "Enter") {
      onSearch(keyword)
      setShowOptions(false)
    }
  }

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
        {options.map((option) => (
          <Option
            key={_optionKey(option)}
            onClick={() => handleOptionClick(option.name)}
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
