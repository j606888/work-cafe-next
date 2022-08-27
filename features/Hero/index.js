import React from "react"
import { Container, Outer } from "./styled"
import Searchbar from "features/Searchbar"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

const Hero = () => {
  return (
    <Outer>
      <Container>
        <h1>尋找適合工作的咖啡店</h1>
        <p>Work Cafe 幫你及時篩選 能靜心做事的咖啡店</p>
        <div className="searchbar">
          <Searchbar />
        </div>
        <button className="quick-search">
          <ArrowForwardIcon sx={{ fontSize: 24, mr: 1 }} />
          快速搜尋 在我附近的咖啡店
        </button>
      </Container>
    </Outer>
  )
}

export default Hero
