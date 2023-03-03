import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material"
import React, { useState } from "react"
import styled from "styled-components"
import { LINKS } from "features/Header/MainHeader"
import { grey02 } from "constants/color"
import UserBlock from "components/UserBlock"
import useUserStore from "stores/useUserStore"

const DialogStyles = {
  sx: {
    width: "90%",
    minHeight: "80%",
    borderRadius: '20px'
  },
}

const MobileMenu = ({ user, onOpen }) => {
  const [open, setOpen] = useState(false)
  const logout = useUserStore((state) => state.logout)


  function handleClose() {
    setOpen(false)
  }

  function handleLogout() {
    logout()
  }

  return (
    <>
      <img src="/hamburger.svg" alt="hamburger" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={handleClose} PaperProps={DialogStyles}>
        <DialogTitle>
          Work Cafe
          <CloseButton src="/cancel.svg" alt="close" onClick={handleClose} />
        </DialogTitle>
        <Divider />
        {user && <UserBlock user={user} />}

        <DialogContent>
          {LINKS.map(({ href, text }, index) => (
            <Link href={href} key={index} target="_blank" rel="noreferrer">
              {text}
            </Link>
          ))}
        </DialogContent>
        <ButtonsGroup>
          {user ? (
            <Button onClick={handleLogout}>登出</Button>
          ) : (
            <>
              <Button black onClick={onOpen}>
                註冊
              </Button>
              <Button onClick={onOpen}>登入</Button>
            </>
          )}
        </ButtonsGroup>
      </Dialog>
    </>
  )
}

const CloseButton = styled.img`
  position: absolute;
  right: 18px;
`

const Link = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${grey02};
  margin: 18px 0;
  text-decoration: none;
`

const ButtonsGroup = styled.div`
  justify-content: flex-end;
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  border: 1px solid #222120;
  border-radius: 12px;
  height: 44px;
  width: 100%;
  line-height: 22px;
  padding: 0 12px;
  background-color: ${({ black }) => (black ? "#000000" : "#FFFFFF")};
  color: ${({ black }) => (black ? "#FFFFFF" : "#000000")};
  font-weight: 500;
  font-size: 16px;
  text-align: center;
`

export default MobileMenu
