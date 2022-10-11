import Searchbar from 'features/Searchbar'
import SearchFilter from 'features/SearchFilter'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 41px 56px;
  display: flex;
  gap: 2rem;
  background-color: #ffffff;
`

const ShortBlock = ({ onSearch, onFilterChange }) => {
  return (
    <Container>
      <Searchbar onSearch={onSearch} />
      <SearchFilter onChange={onFilterChange} />
    </Container>
  )
}

export default ShortBlock
