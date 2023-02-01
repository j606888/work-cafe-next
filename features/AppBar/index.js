import React from "react"
import { Container } from "./styled"
import Navbar from "./Navbar"
import HelpUs from "./HelpUs/HelpUs"
import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import MobileNavbar from "./MobileNavbar"

const AppBar = () => {
  const fullScreen = useMediaQuery(devices.mobileXl)
  const showHelpUs = !fullScreen

  return (
    <Container>
      {showHelpUs && <HelpUs />}
      {fullScreen ? <MobileNavbar /> : <Navbar />}
    </Container>
  )
}

export default AppBar
