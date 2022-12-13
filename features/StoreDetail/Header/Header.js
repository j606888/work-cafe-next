import React, { useState } from "react"
import { Menu, MenuItem } from "@mui/material"
import NotCafeReport from "features/StoreDetail/NotCafeReport"
import styled, { css } from "styled-components"
import { devices } from "constant/styled-theme"
import { addToBookmark, removeFromBookmark } from "api/user_bookmark"
import useLoginModeStore from "stores/useLoginModeStore"
import useUserStore from "stores/useUserStore"
import useSWR from "swr"

const Header = ({ placeId, url, isBookmark, onClick, onBookmarkUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openNotCafe, setOpenNotCafe] = useState(false)
  const setMode = useLoginModeStore((state) => state.setMode)
  const open = Boolean(anchorEl)
  const isLogin = useUserStore((state) => state.isLogin)
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
      setMode("login")
    }
  }

  async function handleRemoveBookmark() {
    if (isLogin) {
      await removeFromBookmark({ placeId })
      onBookmarkUpdate()
      mutate()
    } else {
      setMode("login")
    }
  }

  return (
    <>
      <Container>
        <BackButton onClick={onClick}>
          <img src="/arrow-left.svg" alt="arrow-left" />
          <span>搜尋結果</span>
        </BackButton>
        <ButtonGroup>
          <UrlButton href={url} target="_blank">
            <img src="/navigate.svg" alt="navigate" />
            <span>導航</span>
          </UrlButton>
          <Button onClick={handleAddBookmark}>
            <img src="/like.svg" alt="like" />
            <span>收藏</span>
          </Button>
          <Button>
            <img src="/share.svg" alt="share" />
            <span>分享</span>
          </Button>
          {/* {isBookmark ? (
            <Button onClick={handleRemoveBookmark} active>
              <BookmarkIcon />
              <span>已收藏</span>
            </Button>
          ) : (
            <Button onClick={handleAddBookmark}>
              <BookmarkBorderIcon />
              <span>收藏</span>
            </Button>
          )} */}
          <MoreButton onClick={handleMoreClick}>
            <img src="/more.svg" alt="more" />
          </MoreButton>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 36px 28px 0;
  position: relative;

  h3 {
    margin: 0 auto 0 1rem;
    font-size: 24px;
    color: #757575;
    max-width: 50%;
  }

  @media ${devices.mobileXl} {
    margin: 12px 24px;

    h3 {
      font-size: 20px;
      margin: 0;
      max-width: 90%;
    }
  }
`

const BackButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;

  span {
    color: #222120;
    font-size: 16px;
    font-weight: 400;
  }

  @media ${devices.mobileXl} {
    margin-right: auto;
    span {
      display: none;
    }
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;

  @media ${devices.mobileXl} {
    gap: 0;
  }
`

const MoreButton = styled.div`
  box-sizing: border-box;
  border: 1px solid #e8e6e4;
  border-radius: 12px;
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media ${devices.mobileXl} {
    border: none;
  }
`

const Button = styled.button`
  width: 88px;
  height: 44px;
  align-items: center;
  border: 1px solid #e8e6e4;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #ffffff;
  text-decoration: none;
  color: #222120;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ active }) =>
    active &&
    css`
      border-color: #ef5350;
      color: #ef5350;

      svg {
        color: #ef5350;
      }
    `}

  @media ${devices.mobileXl} {
    border: none;
    width: auto;
    height: auto;

    span {
      display: none;
    }
  }
`

const UrlButton = Button.withComponent("a")
