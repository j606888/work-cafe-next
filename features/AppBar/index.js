import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import LogoutIcon from "@mui/icons-material/Logout"

const Container = styled.div`
  height: 64px;
  background-color: #D7C0AE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    font-size: 24px;
    color: #967E76;
  }
`

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Container>
        <h2>Work Cafe | Taiwan</h2>
        <IconButton onClick={handleClick}>
          <Avatar>H</Avatar>
        </IconButton>
      </Container>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <SupervisorAccountIcon fontSize="small" />
          </ListItemIcon>
          後台管理
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          登出
        </MenuItem>
      </Menu>
    </>
  )
}

export default AppBar
