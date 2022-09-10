import * as React from "react"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"
import CloseIcon from "@mui/icons-material/Close"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Container, Header, Tabs } from "./styled"

export default function UserDrawer({ open, onClose = () => {} }) {
  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={onClose}>
        <Container>
          <Header>
            <span>Work Cafe</span>
            <CloseIcon sx={{ color: "#757575" }} onClick={onClose} />
          </Header>
          <Divider />
          <Tabs>
            <div>
              <BookmarkBorderIcon />
              <span>你的地點</span>
            </div>
            <div>
              <RateReviewOutlinedIcon />
              <span>你的評論</span>
            </div>
            <div>
              <VisibilityOffOutlinedIcon />
              <span>你的隱藏</span>
            </div>
          </Tabs>
          <Divider />
          <Tabs>
            <div>
              <span>回報問題</span>
            </div>
            <div>
              <span>鼓勵我們</span>
            </div>
          </Tabs>
        </Container>
      </Drawer>
    </>
  )
}
