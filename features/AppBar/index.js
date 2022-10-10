import React from "react"
// import AccountMenu from "features/AccountMenu"
import { useState } from "react"
import { Container, HelpUs,  HelpButton } from "./styled"
import HelpUsImprove from "./HelpUsImprove"
import Navbar from "./Navbar"

const AppBar = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Container>
        <HelpUs>
          <span>我們需要你的幫助，讓這個網站更好用！</span>
          <HelpButton onClick={() => setOpen(true)}>怎麼幫？</HelpButton>
        </HelpUs>
        <Navbar />
      </Container>
      <HelpUsImprove open={open} onClose={handleClose} />
    </>
  )
}

export default AppBar
