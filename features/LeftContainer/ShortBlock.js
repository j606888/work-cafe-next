import Searchbar from "features/Searchbar"
import SearchFilter from "features/SearchFilter"
import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import useStoreStore from "stores/useStoreStore"

const Container = styled.div`
  padding: 32px 28px;
  display: flex;
  gap: 18px;
  background-color: #ffffff;

  @media ${devices.mobileXl} {
    gap: 12px;
    padding: 14px 23px;
  }
`

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

export default ShortBlock
