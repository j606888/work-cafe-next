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
import styled from "styled-components"

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
  const [mode, setMode] = useLoginModeStore(
    (state) => [state.mode, state.setMode],
    shallow
  )
  const [isLogin, setIsLogin] = useState(false)
  const user = useUserStore((state) => state.user)

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
        <Links>
          <HomeLink href="/">Work Cafe | Taiwan</HomeLink>
          <Links2>
            <Link
              href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
              passHref
            >
              什麼是Work Cafe？
            </Link>
            <Link
              href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
              passHref
            >
              使用教學
            </Link>
          </Links2>
        </Links>

        {/* <OpenCloseIcon onClick={toggleShowNav} show={showNav} /> */}
        {/* <NavLinks show={showNav}> */}
        {/* <TutorialLink /> */}
        {/* {isLogin ? ( */}
        {/* <AccountMenu /> */}
        {/* ) : ( */}
        <ButtonGroup>
          <Button onClick={() => setMode("login")}>登入</Button>
          <CtaButton onClick={() => setMode("signup")}>註冊</CtaButton>
        </ButtonGroup>
        {/* )} */}
        {/* </NavLinks> */}
      </NavbarContainer>
      <LoginForm mode={mode} setMode={setMode} onClose={handleClose} />
    </>
  )
}

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
`

const Links2 = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;

  a {
    color: #42403f;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
`
export default Navbar
