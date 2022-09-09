import React from "react"
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search"

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 32px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  gap: 0.6rem;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }
`

const SearchHere = ({ onClick = () => {} }) => {
  return (
    <Container onClick={() => onClick()}>
      <SearchIcon sx={{ color: "#1EA7FD", fontSize: "18px" }} />
      <span>搜尋這個區域</span>
    </Container>
  )
}

export default SearchHere
