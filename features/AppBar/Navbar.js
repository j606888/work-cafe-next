import Link from "next/link"
import React, { useState } from "react"
import {
  NavbarContainer,
  NavLinks,
  GreyLink,
  Button,
  CtaButton,
  IconContainer,
} from "./styled"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

const TutorialLink = () => {
  return (
    <Link
      href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
      passHref
    >
      <GreyLink target="_blank" rel="noreferrer">
        教學文件
      </GreyLink>
    </Link>
  )
}

const OpenCloseIcon = ({ onClick, show = false }) => {
  return (
    <IconContainer>
      {show ? <CloseIcon onClick={onClick} /> : <MenuIcon onClick={onClick} />}
    </IconContainer>
  )
}

const MobileNavbar = () => {
  const [showNav, setShowNav] = useState(false)
  function handleLogin() {}
  function handleSignup() {}
  function toggleShowNav() {
    setShowNav((cur) => !cur)
  }

  return (
    <NavbarContainer>
      <h2>Work Cafe | Taiwan</h2>
      <OpenCloseIcon onClick={toggleShowNav} show={showNav} />
      <NavLinks show={showNav}>
        <TutorialLink />
        <CtaButton onClick={handleSignup}>註冊</CtaButton>
        <Button onClick={handleLogin}>登入</Button>
      </NavLinks>
    </NavbarContainer>
  )
}

export default MobileNavbar
