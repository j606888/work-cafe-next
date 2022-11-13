import React, { useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Menu, MenuItem } from "@mui/material"
import NotCafeReport from "features/StoreDetail/NotCafeReport"
import {
  Container,
  BackButton,
  ButtonGroup,
  Button,
  MobileGoogleUrl,
} from "./styled"
import ShareButton from "./ShareButton"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NavigationIcon from '@mui/icons-material/Navigation';
import { addToBookmark, removeFromBookmark } from "api/user_bookmark"
import useLoginModeStore from "stores/useLoginModeStore"
import useUserStore from "stores/useUserStore"
import useSWR from "swr"

const Header = ({
  name,
  placeId,
  url,
  isBookmark,
  onClick,
  onBookmarkUpdate,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openNotCafe, setOpenNotCafe] = useState(false)
  const setMode = useLoginModeStore(state => state.setMode)
  const open = Boolean(anchorEl)
  const isLogin = useUserStore(state => state.isLogin)
  const { mutate } = useSWR(isLogin ? `/user-bookmarks` : null)

  function handleMoreClick(e) {
    setAnchorEl(e.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
    setOpenNotCafe(false)
  }
  async function handleAddBookmark() {
    if (isLogin) {
      await addToBookmark({ placeId })
      onBookmarkUpdate()
      mutate()
    } else {
      setMode('login')
    }
  }

  async function handleRemoveBookmark() {
    if (isLogin) {
      await removeFromBookmark({ placeId })
      onBookmarkUpdate()
      mutate()
    } else {
      setMode('login')
    }
  }

  return (
    <>
      <Container>
        <BackButton onClick={onClick}>
          <ArrowBackIcon />
        </BackButton>
        <h3>{name}</h3>
        <ButtonGroup>
          <MobileGoogleUrl href={url} target="_blank" rel="noreferrer">
            <NavigationIcon />
          </MobileGoogleUrl>
          {isBookmark ? (
            <Button onClick={handleRemoveBookmark} active>
              <BookmarkIcon />
              <span>已收藏</span>
            </Button>
          ) : (
            <Button onClick={handleAddBookmark}>
              <BookmarkBorderIcon />
              <span>收藏</span>
            </Button>
          )}

          <ShareButton placeId={placeId} />
          <Button onClick={handleMoreClick}>
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
      </Container>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => setOpenNotCafe(true)}>回報不適合工作</MenuItem>
      </Menu>
      <NotCafeReport
        placeId={placeId}
        open={openNotCafe}
        onClose={handleClose}
      />
    </>
  )
}

export default Header
