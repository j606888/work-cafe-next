import { Avatar, Button, IconButton, Menu } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import LoginMenu from './LoginMenu'
import { getUser } from "utils/user"
import { useRouter } from 'next/router'

const Container = styled.div`
`

const AccountMenu = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [user, setUser] = React.useState(null)
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
  const handleLogin = () => {
    router.push('/login')
  }

  React.useEffect(() => {
    setUser(getUser())
  }, [])

  if (!user) return (
    <Container>
      <Button variant='contained' onClick={handleLogin}>登入</Button>
    </Container>
  )

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
        <LoginMenu {...user} onLogout={handleLogout} />
      </Menu>
    </Container>
  )
}

export default AccountMenu
