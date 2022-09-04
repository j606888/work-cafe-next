import { Avatar, IconButton, Menu } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import LoginMenu from './LoginMenu'
import { getUser } from "utils/user"

const Container = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  z-index: 999;
`

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    console.log(event)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  React.useEffect(() => {
    setUser(getUser())
  }, [])

  if (!user) return <p>Not Login</p>

  return (
    <Container>
      <IconButton onClick={handleClick} >
        <Avatar src={user.avatar_url} sx={{cursor: 'pointer'}}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <LoginMenu {...user} />
      </Menu>
    </Container>
  )
}

export default AccountMenu
