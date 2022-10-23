import { Avatar, Divider, IconButton } from "@mui/material"
import React, { useState } from "react"
import useUserStore from "stores/useUserStore"
import CloseIcon from "@mui/icons-material/Close"
import styled, { css } from "styled-components"
import Link from "next/link"

const IsLogin = () => {
  const [openTab, setOpenTab] = useState(false)
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  if (!user) return null

  return (
    <>
      <IconButton onClick={() => setOpenTab(true)}>
        <Avatar src={user.avatar_url} sx={{ width: 32, height: 32 }} />
      </IconButton>
      {openTab && (
        <Tabs>
          <Tab header>
            <CloseIcon onClick={() => setOpenTab(false)} />
            <span>帳戶</span>
          </Tab>
          <Tab>
            <Avatar src={user.avatar_url} sx={{ width: 32, height: 32 }} />
            <span>{user.name}</span>
          </Tab>
          <Divider />
          <Tab>
            <Link
              href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
              passHref
            >
              <GreyLink target="_blank" rel="noreferrer">
                教學文件
              </GreyLink>
            </Link>
          </Tab>

          <LogoutButton onClick={logout}>登出</LogoutButton>
        </Tabs>
      )}
    </>
  )
}

const Tabs = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 64px;
  background-color: #fff;
  font-size: 16px;
  padding: 0 16px;

  ${({ header }) =>
    header &&
    css`
      z-index: 2;
      box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.3);
      margin-bottom: 2px;
    `}
`

const LogoutButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: 1px solid #555;
  color: #555;
  padding: 8px 16px;
  border-radius: 16px;
`

const GreyLink = styled.a`
  color: #000;
  font-size: 16px;
  text-decoration: none;
`

export default IsLogin
