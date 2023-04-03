import React from "react"
import styled from "styled-components"
import HelpUs from "./HelpUs"
import MainHeader from "./MainHeader"

const Header = () => {
  return (
    <Container>
      <HelpUs />
      <MainHeader />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

export default Header
