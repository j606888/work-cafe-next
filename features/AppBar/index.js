import React from "react"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import AccountMenu from "features/AccountMenu"
import { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { Container, HelpUs, Content, Link, HelpButton } from "./styled"
import MenuIcon from "@mui/icons-material/Menu"

const AppBar = () => {
  const [open, setOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  function toggleMenu() {
    setShowMenu(cur => !cur)
  }
  return (
    <>
      <Container>
        <HelpUs>
          <span>我們需要你的幫助，讓這個網站更好用！</span>
          <HelpButton onClick={() => setOpen(true)}>怎麼幫？</HelpButton>
        </HelpUs>
        <Content showMenu={showMenu}>
          <h2>Work Cafe | Taiwan</h2>
          <div class="menu">
            <Link
              href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
              target="_blank"
              rel="noreferrer"
            >
              <AutoStoriesIcon fontSize="small" />
              <span>教學文件</span>
            </Link>
            <div className="action-button">
              <AccountMenu />
            </div>
          </div>
          <div class="hamburger">
            <MenuIcon sx={{ color: "#757575", cursor: "pointer" }} onClick={toggleMenu} />
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
            <b>填寫評論：</b>
            無需登入，透過搜尋匡直接找尋你已知的口袋名單，並且給予評論。這會是最大的幫助！
          </DialogContentText>
          <br />
          <DialogContentText>
            <b>回報不是咖啡廳：</b>
            有些店家根本不適合出現在這邊（例如：連鎖手搖飲、無內用空間或是純餐廳）。點擊店家資訊中的回報按鈕，我們會定期去將這些回報的店家移除
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
