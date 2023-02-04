import React from "react"
import styled from "styled-components"
import CircularProgress from "@mui/material/CircularProgress"
import store from "stores/store"
import { mapCenter } from "utils/map-helper"
import useUpdateURL from "hooks/useUpdateURL"
import { devices } from "constants/styled-theme"

const SearchHere = ({ className }) => {
  const { setCenterToURL } = useUpdateURL()
  const { map, setSearchCenter, setPlaceId, setFocusPlaceId  } = store((state) => ({
    map: state.map,
    setSearchCenter: state.setSearchCenter,
    setPlaceId: state.setPlaceId,
    setFocusPlaceId: state.setFocusPlaceId,
  }))
  const isLoading = false

  function onClick() {
    const { lat, lng } = mapCenter(map)
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
    <Container onClick={onClick} className={className}>
      {icon}
      <span>搜尋此區</span>
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 142px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #e8e6e4;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  gap: 0.2rem;
  padding-right: 8px;

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
    height: 48px;
    border-radius: 18px;
    /* font-size: 12px; */
  }
`

export default SearchHere
