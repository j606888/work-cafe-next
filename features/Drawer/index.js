import * as React from "react"
import MuiDrawer from "@mui/material/Drawer"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import styled from "styled-components"
import CardList from "./CardList"

const Btn = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #555;
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 99999;
  position: absolute;
  left: ${({ open, left }) => (open ? left + 24 : 24)}px;
  top: calc(24px + 56px);
  transition: all 0.2s linear;
  cursor: pointer;
`

export default function Drawer({ stores = [], onClick = () => {} }) {
  const [state, setState] = React.useState(false)
  const width = 460

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState((cur) => !cur)
  }

  function handleOnClick(placeId) {
    onClick(placeId)
  }

  React.useEffect(() => {
    setState(true)
  }, [stores])

  return (
    <React.Fragment>
      {stores.length > 0 && (
        <Btn open={state} left={width} onClick={toggleDrawer()}>
          {state ? (
            <ArrowBackIcon sx={{ fontSize: 28 }} />
          ) : (
            <ArrowForwardIcon sx={{ fontSize: 28 }} />
          )}
        </Btn>
      )}
      <MuiDrawer
        anchor={"left"}
        open={state}
        onClose={toggleDrawer}
        variant="persistent"
      >
        <CardList stores={stores} onClick={handleOnClick} />
      </MuiDrawer>
    </React.Fragment>
  )
}
