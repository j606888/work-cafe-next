import React, { useState } from "react"
import {  Menu, MenuItem } from "@mui/material"
import Tooltip from "components/Tooltip"
import NotCafeReport from "features/StoreDetail/NotCafeReport"
import styled, { css } from "styled-components"

import ActionButton from "components/Button/ActionButton"
import useUserStore from "stores/useUserStore"
import { syncPhoto } from "api/admin/store"
import useSWR from "swr"
import ComingSoonForm from "components/ComingSoonForm"
import ShareStore from "components/ShareStore"

const Header = ({ placeId, name, url, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openNotCafe, setOpenNotCafe] = useState(false)
  const open = Boolean(anchorEl)
  const [openComing, setOpenComing] = useState(false)
  const [openShareStore, setOpenShareStore] = useState(false)
  const user = useUserStore((state) => state.user)
  const { data: store, mutate } = useSWR(`/stores/${placeId}`)

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
    setOpenShareStore(true)
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
      <ShareStore
        store={store}
        open={openShareStore}
        onClose={() => setOpenShareStore(false)}
      />
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
    background-color: ${({ theme }) => theme.colors.grey03};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border: none;
    width: auto;
    height: auto;

    span {
      display: none;
    }
  }
`
