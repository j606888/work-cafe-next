import React from "react"
import styled from "styled-components"
import CircularProgress from "@mui/material/CircularProgress"
import store from "stores/store"
import { mapCenter } from "utils/map-helper"
import useUpdateURL from "hooks/useUpdateURL"
import { devices } from "constants/styled-theme"

const SearchHere = () => {
  const { setCenterToURL } = useUpdateURL()
  const { map, setSearchCenter, setPlaceId, setFocusPlaceId, setKeyword  } = store((state) => ({
    map: state.map,
    setSearchCenter: state.setSearchCenter,
    setPlaceId: state.setPlaceId,
    setFocusPlaceId: state.setFocusPlaceId,
    setKeyword: state.setKeyword,
  }))
  const isLoading = false

  function onClick() {
    const { lat, lng } = mapCenter(map)

    setKeyword('')
    setPlaceId(null)
    setFocusPlaceId(null)
    setSearchCenter({ lat, lng })
    setCenterToURL()
  }

  const icon = isLoading ? (
    <CircularProgress size={18} />
  ) : (
    <img src="/search-btn-outline.svg" alt="search-btn" />
  )

  return (
    <Container onClick={onClick}>
      {icon}
      <span>搜尋此區</span>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0 18px 0 12px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #e8e6e4;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  gap: 0.2rem;

  &:hover {
    background-color: #f5f5f5;
  }

  span {
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    color: #222120;
  }

  @media ${devices.mobileXl} {
    top: auto;
    transform: none;
    bottom: 20px;
    left: auto;
    right: 60px;
    height: 42px;
    border-radius: 18px;
    padding: 0 18px 0 18px;

    img {
      display: none;
    }
  }
`

export default SearchHere
