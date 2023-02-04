import { Avatar, Button, IconButton, Menu } from "@mui/material"
import React from "react"
import LoginMenu from "./LoginMenu"
import { useState } from "react"
import LoginForm from "./LoginForm"
import useUserStore from "stores/useUserStore"

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const [openForm, setOpenForm] = useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    logout()
  }

  React.useEffect(() => {
    setAnchorEl(null)
  }, [openForm])

  if (!user)
    return (
      <>
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenForm(true)}
        >
          登入
        </Button>
        <LoginForm open={openForm} onClose={() => setOpenForm(false)} />
      </>
    )

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar src={user.avatar_url} sx={{ cursor: "pointer" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <LoginMenu {...user} onLogout={handleLogout} />
      </Menu>
    </>
  )
}

export default AccountMenu
