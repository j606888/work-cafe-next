import React from "react"
import styled from "styled-components"

import { useState } from "react"

import useUserStore from "stores/useUserStore"
import { useEffect } from "react"
import NotLogin from "./NotLogin"
import IsLogin from "./IsLogin"

const MobileNavbar = () => {
  const [isLogin, setIsLogin] = useState(false)
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    setIsLogin(!!user)
  }, [user])

  function handleClose() {
    setOpenTab(false)
  }

  return (
    <>
      <Container>
        <HomeLink href="/">Work Cafe | Taiwan</HomeLink>
        {isLogin ? <IsLogin onClose={handleClose} /> : <NotLogin onClose={handleClose} />}
      </Container>
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

export default MobileNavbar
