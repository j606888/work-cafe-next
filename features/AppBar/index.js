import React from "react"
import styled from "styled-components"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import AccountMenu from "features/AccountMenu"
import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;

  h2 {
    font-size: 18px;
    font-weight: 700;
  }
`

const HelpUs = styled.div`
  text-align: center;
  background-color: #eee;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  span {
    color: #333;
  }

  a {
    color: #333;
    font-weight: 500;

    &:hover {
      color: #555;
    }
  }
`

const Content = styled.div`
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: #fff;

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
  color: #666;
  gap: 0.5rem;
  padding-bottom: 2px;

  &:hover {
    border-bottom: 1px solid #666;
  }
`

const HelpButton = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  font-size: 14px;
  text-decoration:underline;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`

const AppBar = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
    <Container>
      <HelpUs>
        <span>我們需要你的幫助，讓這個網站更完整。</span>
        <HelpButton onClick={() => setOpen(true)}>怎麼幫？</HelpButton>
      </HelpUs>
      <Content>
        <h2>Work Cafe | Taiwan</h2>
        <div>
          <Link
            href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
            target="_blank"
            rel="noreferrer"
          >
            <AutoStoriesIcon fontSize="small" />
            <span>教學文件</span>
          </Link>
          <AccountMenu />
        </div>
      </Content>
    </Container>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>幫助我們做得更好</DialogTitle>
      <DialogContent>
        <DialogContentText>
          這個網站才剛起步，需要眾人的力量才能讓整個網站的功能更加完整。
        </DialogContentText>
        <br />
        <DialogContentText>
          <b>填寫評論：</b>無需登入，透過搜尋匡直接找尋你已知的口袋名單，並且給予評論。這會是最大的幫助！
        </DialogContentText>
        <br />
        <DialogContentText>
          <b>回報不是咖啡廳：</b>有些店家根本不適合出現在這邊（例如：連鎖手搖飲、無內用空間或是純餐廳）。點擊店家資訊中的回報按鈕，我們會定期去將這些回報的店家移除
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose}>我知道了</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  </>
  )
}

export default AppBar
