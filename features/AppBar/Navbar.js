import Link from "next/link"
import React, { useEffect, useState } from "react"
import {
  NavbarContainer,
  NavLinks,
  GreyLink,
  Button,
  CtaButton,
  IconContainer,
  HomeLink,
} from "./styled"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import LoginForm from "features/AccountMenu/LoginForm"
import AccountMenu from "features/AccountMenu"
import useLoginModeStore from "stores/useLoginModeStore"
import shallow from "zustand/shallow"
import useUserStore from "stores/useUserStore"

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

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)
  const [mode, setMode] = useLoginModeStore((state) => [state.mode, state.setMode], shallow)
  const [isLogin, setIsLogin] = useState(false)
  const user = useUserStore(state => state.user)

  useEffect(() => {
    setIsLogin(!!user)
  }, [user])

  function toggleShowNav() {
    setShowNav((cur) => !cur)
  }

  function handleClose({ deep }) {
    setMode(null)
    if (deep) {
      toggleShowNav()
    }
  }

  return (
    <>
      <NavbarContainer>
        <HomeLink href="/">Work Cafe | Taiwan</HomeLink>
        <OpenCloseIcon onClick={toggleShowNav} show={showNav} />
        <NavLinks show={showNav}>
          <TutorialLink />
          {isLogin ? (
            <AccountMenu />
          ) : (
            <>
              <Button onClick={() => setMode("login")}>登入</Button>
              <CtaButton onClick={() => setMode("signup")}>註冊</CtaButton>
            </>
          )}
        </NavLinks>
      </NavbarContainer>
      <LoginForm mode={mode} setMode={setMode} onClose={handleClose} />
    </>
  )
}

export default Navbar
