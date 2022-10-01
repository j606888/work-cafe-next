import React from 'react'
import styled from 'styled-components'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
`

const SearchFilterV2 = () => {
  return (
    <Container>
      篩選
      <FilterAltIcon />
    </Container>
  )
}

export default SearchFilterV2
