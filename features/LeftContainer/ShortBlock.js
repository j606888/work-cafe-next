import SearchFilter from "features/SearchFilter"
import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import useStoreStore from "stores/useStoreStore"
import Searchbar from "features/Searchbar"
import SvgButton from "components/SvgButton"

const ShortBlock = ({
  onFilterChange,
  showFilter = true,
  expand = false,
  onMapOpen,
}) => {
  const placeId = useStoreStore((state) => state.placeId)
  if (placeId) return null

  return (
    <Container expand={expand}>
      <SearchTool>
        <Searchbar type="storeList" />
        {showFilter && <SearchFilter onChange={onFilterChange} />}
      </SearchTool>
      {expand && (
        <ShowMapButton onClick={onMapOpen}>
          <SvgButton path="location_36" />
          <span>顯示地圖</span>
        </ShowMapButton>
      )}
    </Container>
  )
}

const ShowMapButton = styled.div`
  border: 1px solid #222120;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #222120;
  gap: 0.4rem;
  padding-right: 0.5rem;
  cursor: pointer;
`

const SearchTool = styled.div`
  width: 100%;
  max-width: 572px;
  display: flex;
  gap: 18px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 28px;
  background-color: #ffffff;
  position: sticky;
  top: 120px;
  z-index: 10;

  @media ${devices.mobileXl} {
    background-color: transparent;
    gap: 12px;
    padding: 14px 23px;

    ${({ expand }) =>
      expand &&
      `
      background-color: #ffffff;
      top: 56px;
    `}
  }
`

export default ShortBlock
