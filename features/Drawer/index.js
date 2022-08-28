import * as React from "react"
import Box from "@mui/material/Box"
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
  top: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
`

export default function Drawer({ stores=[] }) {
  const [state, setState] = React.useState(true)
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

  return (
    <div>
      <React.Fragment>
        <Btn open={state} left={width} onClick={toggleDrawer()}>
          {state ? (
            <ArrowBackIcon sx={{ fontSize: 28 }} />
          ) : (
            <ArrowForwardIcon sx={{ fontSize: 28 }} />
          )}
        </Btn>
        <MuiDrawer
          anchor={"left"}
          open={state}
          onClose={toggleDrawer}
          variant="persistent"
        >
          <CardList stores={stores} />
        </MuiDrawer>
      </React.Fragment>
    </div>
  )
}
