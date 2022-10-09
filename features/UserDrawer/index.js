import * as React from "react"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"
import CloseIcon from "@mui/icons-material/Close"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { Container, Header, Tabs } from "./styled"
import useAuthCheck from "hooks/useAuthCheck"
import useMapStore from "hooks/useMapStore"
import useStoreStore from "stores/useStoreStore"
import { Link } from "@mui/material"

export default function UserDrawer({ open, onClose = () => {} }) {
  const clearStores = useStoreStore((state) => state.clearStores)
  const setMode = useMapStore((state) => state.setMode)
  const authCheck = useAuthCheck()

  const handleChangeMode = (mode) => {
    authCheck()
    onClose()
    clearStores()
    setMode(mode)
  }

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
            <div onClick={() => handleChangeMode("BOOKMARK")}>
              <BookmarkBorderIcon />
              <span>你的地點</span>
            </div>
            <div onClick={() => handleChangeMode("REVIEW")}>
              <RateReviewOutlinedIcon />
              <span>你的貢獻</span>
            </div>
            <div onClick={() => handleChangeMode("HIDDEN")}>
              <VisibilityOffOutlinedIcon />
              <span>你的隱藏</span>
            </div>
          </Tabs>
          <Divider />
          <Tabs>
            <div>
              <Link
                href="https://forms.gle/ji1wZiLVQ56uV1679"
                target="_blank"
                rel="noreferrer"
              >
                回報問題
              </Link>
            </div>
            <div>
              <Link
                href="https://forms.gle/sffkpKzUnEx9Ttd47"
                target="_blank"
                rel="noreferrer"
              >
                找不到店家
              </Link>
            </div>
          </Tabs>
        </Container>
      </Drawer>
    </>
  )
}
