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
    // setOpenTab(false)
  }

  return (
    <>
      <Container>
        <HomeLink href="/map">Work Cafe | Taiwan</HomeLink>
        {isLogin ? (
          <IsLogin onClose={handleClose} />
        ) : (
          <NotLogin onClose={handleClose} />
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  background: #ffffff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  border-bottom: 1px solid #e8e6e4;
`

const HomeLink = styled.a`
  font-size: 16px;
  font-weight: 900;
  line-height: 22px;
  color: #222120;
  text-decoration: none;
`

export default MobileNavbar
