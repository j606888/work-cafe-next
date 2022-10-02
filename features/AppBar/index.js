import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import LogoutIcon from "@mui/icons-material/Logout"
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const Container = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;
  background: #fff;

  h2 {
    font-size: 18px;
    font-weight: 700;
  }

  div {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  gap: 0.5rem;
  padding-bottom: 2px;
  border-bottom: 1px solid #fff;
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
        <div>
          <Link
            href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
            target="_blank"
            rel="noreferrer"
          >
            <LightbulbIcon />
            <span>教學文件</span>
          </Link>
          <IconButton onClick={handleClick}>
            <Avatar>H</Avatar>
          </IconButton>
        </div>
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
