import React, { useRef, useState } from "react"
import { Box, Menu, MenuItem } from "@mui/material"
import Tooltip from "components/Tooltip"
import copy from "copy-to-clipboard"
import NotCafeReport from "features/StoreDetail/NotCafeReport"
import styled, { css } from "styled-components"
import { devices } from "constants/styled-theme"
import ActionButton from "components/Button/ActionButton"
import BookmarkButton from "./BookmarkButton"
import { snackbarStore } from "features/GlobalSnackbar"
import useUserStore from "stores/useUserStore"
import { syncPhoto } from "api/admin/store"
import useSWR from "swr"
import ComingSoonForm from "components/ComingSoonForm"
import { grey05 } from "constants/color"

const Header = ({ placeId, name, url, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openNotCafe, setOpenNotCafe] = useState(false)
  const open = Boolean(anchorEl)
  const { openSnackbar, setMessage } = snackbarStore((state) => ({
    openSnackbar: state.openSnackbar,
    setMessage: state.setMessage,
  }))
  const [openComing, setOpenComing] = useState(false)
  const user = useUserStore((state) => state.user)
  const { mutate } = useSWR(`/stores/${placeId}`)

  function handleMoreClick(e) {
    setAnchorEl(e.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
    setOpenNotCafe(false)
  }
  function handleNavigate() {
    const baseUrl = "https://www.google.com/maps/dir/"
    const queryParams = {
      api: 1,
      query: "Google",
      destination_place_id: placeId,
      destination: name
    }
    const queryString = new URLSearchParams(queryParams).toString()
    window.open(`${baseUrl}?${queryString}`, "_blank")
  }
  function handleShare() {
    const origin = window.location.origin
    const shareLink = `${origin}/share/${placeId}`
    copy(shareLink)
    setMessage("已複製到剪貼簿")
    openSnackbar()
    setAnchorEl(null)
  }
  function handleComingSoon() {
    setOpenComing(true)
  }
  async function syncPhotos() {
    await syncPhoto({ placeId })
    mutate()
  }

  return (
    <>
      <Container>
        <BackButton onClick={onClick}>
          <img src="/arrow-left.svg" alt="arrow-left" />
          <span>搜尋結果</span>
        </BackButton>
        <ButtonGroup>
          <ActionButton svg="navigate" onClick={handleNavigate}>
            導航
          </ActionButton>
          {/* <BookmarkButton placeId={placeId} /> */}
          <Tooltip title="功能開發中" placement="bottom-end">
            <ActionButton svg="like" onClick={handleComingSoon}>
              收藏
            </ActionButton>
          </Tooltip>
          <Tooltip title="功能開發中" placement="bottom-end">
            <ActionButton svg="fire" onClick={handleComingSoon}>
              想去
            </ActionButton>
          </Tooltip>
          <MoreButton onClick={handleMoreClick}>
            <img src="/more.svg" alt="more" />
          </MoreButton>
        </ButtonGroup>
      </Container>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: "12px" } }}
      >
        <MenuItem onClick={handleShare}>
          <img src="/share.svg" alt="share" />
          分享
        </MenuItem>
        <MenuItem onClick={() => setOpenNotCafe(true)}>
          <img src="/block.svg" alt="block" />
          回報不是咖啡店
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem onClick={syncPhotos}>新增照片5張</MenuItem>
        )}
      </Menu>
      <NotCafeReport
        placeId={placeId}
        open={openNotCafe}
        onClose={handleClose}
      />
      <ComingSoonForm open={openComing} onClose={() => setOpenComing(false)} />
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
  padding: 4px 16px 4px 8px;
  border-radius: 12px;

  span {
    color: #222120;
    font-size: 16px;
    font-weight: 400;
  }

  &:hover {
    background-color: #f3f3f3;
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

  &:hover {
    background-color: ${grey05};
  }

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
