import { Avatar, Button, IconButton, Menu } from "@mui/material"
import React from "react"
import styled from "styled-components"
import LoginMenu from "./LoginMenu"
import { getUser } from "utils/user"
import { useState } from "react"
import LoginForm from "./LoginForm"

const Container = styled.div``

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [openForm, setOpenForm] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  React.useEffect(() => {
    setUser(getUser())
    setAnchorEl(null)
  }, [openForm])

  if (!user)
    return (
      <>
        <Container>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenForm(true)}
          >
            登入
          </Button>
        </Container>
        <LoginForm open={openForm} onClose={() => setOpenForm(false)} />
      </>
    )

  return (
    <Container>
      <IconButton onClick={handleClick}>
        <Avatar src={user.avatar_url} sx={{ cursor: "pointer" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <LoginMenu {...user} onLogout={handleLogout} />
      </Menu>
    </Container>
  )
}

export default AccountMenu
