import React from "react"
import styled from "styled-components"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import WhereToVoteIcon from "@mui/icons-material/WhereToVote"
import { Divider, Tooltip } from "@mui/material"

const Container = styled.div`
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  gap: 0.8rem;
`
const Input = styled.input`
  width: 210px;
  border: none;
  outline: none;
  font-size: 16px;
`

const SearchbarV2 = () => {
  return (
    <Container>
      <Tooltip title="選單">
        <MenuIcon sx={{ color: "#333333", cursor: "pointer" }} />
      </Tooltip>
      <Input placeholder="搜尋 Google 地圖" />
      <Tooltip title="搜尋">
        <SearchIcon sx={{ color: "#CCCCCC", cursor: "pointer" }} />
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="這裡">
        <WhereToVoteIcon sx={{ color: "#8AB4F8", cursor: "pointer" }} />
      </Tooltip>
    </Container>
  )
}

export default SearchbarV2
