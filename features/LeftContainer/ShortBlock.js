import SearchFilter from "features/SearchFilter"
import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import useStoreStore from "stores/useStoreStore"
import Searchbar from "features/Searchbar"

const ShortBlock = ({ onFilterChange, showFilter = true }) => {
  const placeId = useStoreStore((state) => state.placeId)
  if (placeId) return null

  return (
    <Container>
      <Searchbar type="storeList" />
      {showFilter && <SearchFilter onChange={onFilterChange} />}
    </Container>
  )
}

const Container = styled.div`
  padding: 32px 28px;
  display: flex;
  gap: 18px;
  background-color: #ffffff;
  position: sticky;
  top: 120px;
  z-index: 10;

  @media ${devices.mobileXl} {
    background-color: transparent;
    gap: 12px;
    padding: 14px 23px;
  }
`

export default ShortBlock
