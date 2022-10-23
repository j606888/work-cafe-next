import React from "react"
import styled, { css } from "styled-components"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import { Divider } from "@mui/material"
import useLoginModeStore from "stores/useLoginModeStore"
import LoginForm from "features/AccountMenu/LoginForm"
import shallow from "zustand/shallow"
import Link from "next/link"

const MobileNavbar = () => {
  const [openTab, setOpenTab] = useState(false)
  const [mode, setMode] = useLoginModeStore(
    (state) => [state.mode, state.setMode],
    shallow
  )

  function handleClose() {
    setMode(null)
    setOpenTab(false)
  }

  return (
    <>
      <Container>
        <HomeLink href="/">Work Cafe | Taiwan</HomeLink>
        <AccountCircleOutlinedIcon onClick={() => setOpenTab(true)} />
      </Container>
      {openTab && (
        <Tabs>
          <Tab header>
            <CloseIcon onClick={() => setOpenTab(false)} />
            <span>帳戶</span>
          </Tab>
          <Tab>
            <Button onClick={() => setMode("login")}>註冊</Button>
          </Tab>
          <Tab>
            <Button onClick={() => setMode("signup")}>登入</Button>
          </Tab>
          <Divider sx={{ color: "#999" }} />
          <Tab>
            <Link
              href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
              passHref
            >
              <GreyLink target="_blank" rel="noreferrer">
                教學文件
              </GreyLink>
            </Link>
          </Tab>
        </Tabs>
      )}
      <LoginForm mode={mode} setMode={setMode} onClose={handleClose} />
    </>
  )
}

const Container = styled.div`
  background: #eadfd5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 18px;
`

const HomeLink = styled.a`
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #704f39;
  text-decoration: none;
`

const Tabs = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 64px;
  background-color: #fff;
  font-size: 16px;
  padding: 0 16px;

  ${({ header }) =>
    header &&
    css`
      z-index: 2;
      box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.3);
      margin-bottom: 2px;
    `}
`

const Button = styled.button`
  border: none;
  background: none;
  color: #704e38;
  font-weight: 500;
  font-size: 16px;
`

const GreyLink = styled.a`
  color: #000;
  font-size: 16px;
  text-decoration: none;
`

export default MobileNavbar
