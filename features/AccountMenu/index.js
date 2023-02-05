import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import React, { useState } from "react"
import styled from "styled-components"
import LoginForm from "./LoginForm"
import { GoogleOAuthProvider } from "@react-oauth/google"
import useUserStore from "stores/useUserStore"
import UserInfo from "./UserInfo"
import create from "zustand"

const GOOGLE_LOGIN_KEY = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_KEY

export const formControl = create((set) => ({
  openForm: false,
  setOpenForm: (openForm) => set({ openForm }),
}))

const AccountMenu = () => {
  const { openForm, setOpenForm } = formControl((state) => ({
    openForm: state.openForm,
    setOpenForm: state.setOpenForm,
  }))
  const fullScreen = useMediaQuery(devices.mobileXl)
  const user = useUserStore((state) => state.user)

  function handleOpenForm() {
    setOpenForm(true)
  }

  if (fullScreen)
    return (
      <Container>
        <img src="/hamburger.svg" alt="hamburger" />
      </Container>
    )

  if (user)
    return (
      <Container>
        <UserInfo user={user} />
      </Container>
    )

  return (
    <>
      <Container>
        <Button onClick={handleOpenForm}>登入</Button>
        <Button black onClick={handleOpenForm}>
          註冊
        </Button>
      </Container>
      <GoogleOAuthProvider clientId={GOOGLE_LOGIN_KEY}>
        <LoginForm open={openForm} onClose={() => setOpenForm(false)} />
      </GoogleOAuthProvider>
    </>
  )
}

const Container = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`

const Button = styled.button`
  border: 1px solid #222120;
  border-radius: 12px;
  height: 44px;
  min-width: 68px;
  line-height: 22px;
  padding: 0 12px;
  background-color: ${({ black }) => (black ? "#000000" : "#FFFFFF")};
  color: ${({ black }) => (black ? "#FFFFFF" : "#000000")};
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`

export default AccountMenu
