import Searchbar from 'features/Searchbar'
import SearchFilter from 'features/SearchFilter'
import React from 'react'
import styled from 'styled-components'

const SearchStores = ({ showBorder }) => {
  return (
    <Container showBorder={showBorder}>
      <Searchbar type="storeList" />
      <SearchFilter />
    </Container>
  )
}

const Container = styled.div`
  flex-shrink: 0;
  height: 112px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 28px;
  gap: 12px;
  ${({ showBorder, theme }) => showBorder && `border-bottom: 1px solid ${theme.colors.grey02};`}

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 84px;
    width: 100%;
    background: none;
    border-bottom: none;
    position: fixed;
  }
`

export default SearchStores
