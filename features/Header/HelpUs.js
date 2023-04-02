import { useState } from "react"
import HelpUsModal from "./HelpUsModal"
import styled from "styled-components"
import mixpanel from "mixpanel-browser"

const HEIGHT = {
  normal: "40px",
  mobileXl: "32px",
}

const HelpUs = () => {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
    mixpanel.track("open-help-us")
  }

  return (
    <>
      <Container>
        <span>我們需要你的幫助，讓這個網站更好用！</span>
        <HelpButton onClick={handleOpen}>怎麼幫？</HelpButton>
      </Container>
      <HelpUsModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

const Container = styled.div`
  text-align: center;
  background: #222120;
  height: ${HEIGHT.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

const HelpButton = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: #fff;
`

export default HelpUs
