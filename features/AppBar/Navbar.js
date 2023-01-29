import React, { useEffect, useState } from "react"
import {
  NavbarContainer,
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
          <HomeLink href="/map">Work Cafe | Taiwan</HomeLink>
          <Links2>
            <a
              href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
              target="_blank"
              rel="noreferrer"
            >
              什麼是Work Cafe？
            </a>
            <a
              href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/shi-yong-jiao-xue/di-yi-ci-shi-yong"
              target="_blank"
              rel="noreferrer"
            >
              使用教學
            </a>
          </Links2>
        </Links>

        {/* <OpenCloseIcon onClick={toggleShowNav} show={showNav} /> */}
        {/* <NavLinks show={showNav}> */}
        {isLogin ? (
          <AccountMenu />
        ) : (
          <ButtonGroup>
            <Button onClick={() => setMode("login")}>登入</Button>
            <CtaButton onClick={() => setMode("signup")}>註冊</CtaButton>
          </ButtonGroup>
        )}
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
