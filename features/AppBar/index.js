import React from "react"
// import AccountMenu from "features/AccountMenu"
import { Container } from "./styled"
import Navbar from "./Navbar"
import HelpUs from "./HelpUs/HelpUs"

const AppBar = () => {
  return (
    <Container>
      <HelpUs />
      <Navbar />
    </Container>
  )
}

export default AppBar
