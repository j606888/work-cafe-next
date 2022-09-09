import { Avatar, Divider } from "@mui/material"
import Link from "next/link"
import React from "react"
import SettingsIcon from "@mui/icons-material/Settings"
import ChildCareIcon from "@mui/icons-material/ChildCare"
import { Container, Header, Body, Button } from "./styled"

const LoginMenu = ({ avatar_url, email, name, role }) => {
  return (
    <Container>
      <Header>
        <Avatar src={avatar_url} sx={{ width: 64, height: 64, marginY: 2, border: '1px solid #eee' }} />
        <span className="name">{name}</span>
        <span className="email">{email}</span>
      </Header>
      <Divider />
      <Body>
        <Link href="/admin/dashboard">
          <a className="link">
            <ChildCareIcon />
            後台管理
          </a>
        </Link>
        <Link href="/admin/dashboard">
          <a className="link">
            <SettingsIcon />
            設定
          </a>
        </Link>
        <Button>登出</Button>
      </Body>
    </Container>
  )
}

export default LoginMenu
