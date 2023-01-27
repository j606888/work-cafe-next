import React from "react"
import { Container } from "./styled"
import Navbar from "./Navbar"
import HelpUs from "./HelpUs/HelpUs"
import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import MobileNavbar from "./MobileNavbar"
import store, { PANEL_TYPES } from "stores/store"

const AppBar = () => {
  const { panelType } = store((state) => ({
    panelType: state.panelType,
  }))
  const fullScreen = useMediaQuery(devices.mobileXl)
  const isLanding = panelType === PANEL_TYPES.INIT
  const showHelpUs = !fullScreen || isLanding

  return (
    <Container>
      {showHelpUs && <HelpUs />}
      {fullScreen ? <MobileNavbar /> : <Navbar />}
    </Container>
  )
}

export default AppBar
