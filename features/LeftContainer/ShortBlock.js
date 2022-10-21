import Searchbar from 'features/Searchbar'
import SearchFilter from 'features/SearchFilter'
import React from 'react'
import styled from 'styled-components'
import { devices } from "constant/styled-theme"
import useStoreStore from 'stores/useStoreStore'

const Container = styled.div`
  padding: 41px 56px;
  display: flex;
  gap: 2rem;
  background-color: #FCF9F6;

  @media ${devices.iphoneSE} {
    gap: 12px;
    padding: 14px 23px;
  }
`

const ShortBlock = ({ onSearch, onFilterChange, showFilter = true }) => {
  const placeId = useStoreStore(state => state.placeId)
  if (placeId) return null

  return (
    <Container>
      <Searchbar onSearch={onSearch} />
      {showFilter && (
        <SearchFilter onChange={onFilterChange} />
      )}
    </Container>
  )
}

export default ShortBlock
