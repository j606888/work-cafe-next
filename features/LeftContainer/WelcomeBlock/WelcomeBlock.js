import React from "react"
import WhereToGo from "./WhereToGo"
import Searchbar from "features/Searchbar"
import { CircularProgress } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import WelcomeMessage from "features/WelcomeMessage"
import {
  Or,
  Upper,
  SearchContainer,
  HelloContainer,
  SearchNearbyButton,
} from "./styled"

const WelcomeBlock = ({ onSearch, onNearbySearch, loading = false }) => {
  return (
    <>
      <Upper>
        <HelloContainer>
          <WhereToGo />
          <p>Work Cafe 幫你快速篩選 適合辦公的咖啡店</p>
        </HelloContainer>
        <SearchContainer>
          <Searchbar onSearch={onSearch} />
          {/* <SearchFilter onChange={handleFilterChange} /> */}
        </SearchContainer>
        <Or>或</Or>
        <SearchNearbyButton onClick={onNearbySearch}>
          {loading ? <CircularProgress size={24} /> : <ArrowForwardIcon />}
          <span>搜尋 我附近的咖啡店</span>
        </SearchNearbyButton>
      </Upper>
      <WelcomeMessage />
    </>
  )
}

export default WelcomeBlock
