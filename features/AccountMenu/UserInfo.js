import { Avatar, Divider, IconButton, Menu } from '@mui/material'
import React, { useState } from 'react'
import useUserStore from 'stores/useUserStore'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { colors } from 'constants/styled-theme'

const MenuStyles = {
  sx: {
    width: '180px',
    color: colors.black02,
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
        <MenuItem disabled>
          <span>收藏清單</span>
          <span>(開發中)</span>
        </MenuItem>
        <MenuItem disabled>
          <span>評論</span>
          <span>(開發中)</span>
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <span>個人資料</span>
          <span>(開發中)</span>
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem>
            <Link href="/admin/dashboard">後台管理</Link>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>登出</MenuItem>
      </Menu>
    </>
  )
}

const disableStyle = css`
  cursor: not-allowed;
  color: #999;
`

const MenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  line-height: 44px;
  color: ${({ theme }) => theme.colors.black02};
  font-size: 16px;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #f5f5f5;
  }

  a {
    color: ${({ theme }) => theme.colors.black02};
    text-decoration: none;
  }

  ${({ disabled }) => disabled && disableStyle}
`

export default UserInfo
