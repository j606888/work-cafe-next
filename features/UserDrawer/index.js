import * as React from "react"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import CloseIcon from "@mui/icons-material/Close"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import RateReviewIcon from "@mui/icons-material/RateReview"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { Container, Header, Tabs } from "./styled"

export default function UserDrawer() {
  const [open, setOpen] = React.useState(true)

  const list = () => (
    <Container onClick={() => setState(false)}>
      <Header>
        <span>Work Cafe</span>
        <CloseIcon sx={{ color: "#757575" }} />
      </Header>
      <Divider />
      <Tabs>
        <div>
          <BookmarkIcon />
          <span>你的地點</span>
        </div>
        <div>
          <RateReviewIcon />
          <span>你的評論</span>
        </div>
        <div>
          <VisibilityOffIcon />
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
  )

  return (
    <>
      <Button onClick={() => setOpen(true)}>LEFT</Button>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        {list()}
      </Drawer>
    </>
  )
}
