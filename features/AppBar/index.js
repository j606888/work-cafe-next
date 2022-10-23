import React from "react"
import { Container } from "./styled"
import Navbar from "./Navbar"
import HelpUs from "./HelpUs/HelpUs"
import { useMediaQuery } from "@mui/material"
import { devices } from "constant/styled-theme"
import MobileNavbar from "./MobileNavbar"

const AppBar = () => {
  const fullScreen = useMediaQuery(devices.mobileXl)

  return (
    <Container>
      <HelpUs />
      {fullScreen ? <MobileNavbar /> : <Navbar />}
    </Container>
  )
}

export default AppBar
