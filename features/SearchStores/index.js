import { grey04 } from 'constants/color'
import { devices } from 'constants/styled-theme'
import Searchbar from 'features/Searchbar'
import SearchFilter from 'features/v2/SearchFilter'
import React from 'react'
import styled from 'styled-components'

const SearchStores = () => {
  return <Container>
    <Searchbar type='storeList' />
    <SearchFilter />
  </Container>
}

const Container = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: calc(80px + 40px);
  width: 628px;
  height: 112px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 28px;
  gap: 12px;
  border-bottom: 1px solid ${grey04};

  @media ${devices.mobileXl} {
    height: 84px;
    width: 100%;
    top: 56px;
    background: none;
    border-bottom: none;
  }
`

export default SearchStores
