import { Avatar, Divider } from "@mui/material"
import Link from "next/link"
import React from "react"
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Container, Header, Body, Button } from "./styled"
import useUserStore from "stores/useUserStore";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const LoginMenu = ({ avatar_url, email, name, role, onLogout = () => {} }) => {
  const logout = useUserStore(state => state.logout)
  const handleLogout = () => {
    logout()
    onLogout()
  }

  return (
    <Container>
      <Header>
        <Avatar
          src={avatar_url}
          sx={{ width: 64, height: 64, marginY: 2, border: "1px solid #eee" }}
        />
        <span className="name">{name}</span>
        <span className="email">{email}</span>
      </Header>
      <Divider />
      <Body>
        {role === 'admin' && (
          <Link href="/admin/dashboard">
            <a className="link">
              <SupervisorAccountIcon />
              後台管理
            </a>
          </Link>
        )}
        <Link href="/bookmarks">
          <a className="link">
            <BookmarkIcon />
            你的收藏
          </a>
        </Link>
        <Button onClick={handleLogout}>登出</Button>
      </Body>
    </Container>
  )
}

export default LoginMenu
