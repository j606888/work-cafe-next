import * as React from "react"
import MuiDrawer from "@mui/material/Drawer"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import styled from "styled-components"
import CardList from "features/Drawer/CardList"
import Card from "features/Drawer/Card"

const Container = styled.div`
  background-color: #fff;
  display: inline-flex;
  flex-direction: column;

  height: 100vh;
  position: relative;

  .white-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 428px;
    background-color: #fff;
    height: 4rem;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`

const Scrollbar = styled.div`
  overflow-y: scroll;
  height: 100vh;
  padding-top: 5rem;

  ::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`

export default function StoreListV2({
  stores = [],
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) {
  function handleMouseEnter(placeId) {
    onMouseEnter(placeId)
  }

  function handleMouseLeave(placeId) {
    onMouseLeave(placeId)
  }

  return (
    <Container>
      <div className="white-box"></div>
      <Scrollbar>
        {stores.map((store) => (
          <Card
            key={store.placeId}
            {...store}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </Scrollbar>
    </Container>
  )
}
