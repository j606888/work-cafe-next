import { Avatar, Divider, IconButton, Menu } from '@mui/material'
import { grey02 } from 'constants/color'
import React, { useState } from 'react'
import useUserStore from 'stores/useUserStore'
import styled from 'styled-components'

const MenuStyles = {
  sx: {
    width: '160px',
    color: grey02,
    fontSize: '16px',
  }
}
const UserInfo = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const logout = useUserStore((state) => state.logout)


  const avatar = user.avatar_url ? <Avatar alt={user.name} src={user.avatar_url} /> : <Avatar>{user.name[0]}</Avatar>

  function handleClick(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleLogout() {
    logout()
  }

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        {avatar}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={MenuStyles}
      >
        <MenuItem>收藏清單</MenuItem>
        <MenuItem>評論</MenuItem>
        <Divider />
        <MenuItem>個人資料</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>登出</MenuItem>
      </Menu>
    </>
  )
}

const MenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  line-height: 44px;
  color: ${grey02};
  font-size: 16px;

  &:hover {
    background-color: #fafafa;
  }
`

export default UserInfo
