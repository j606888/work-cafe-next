import React, { useState } from "react"
import copy from "copy-to-clipboard"
import { Snackbar } from "@mui/material"
import styled from "styled-components"
import { devices } from "constants/styled-theme"

const ShareButton = () => {
  const [open, setOpen] = useState(false)

  function handleClick() {
    const href = window.location.href
    copy(href)
    setOpen(true)
  }

  function handleClose() {
    setOpen()
  }

  return (
    <>
      <Button onClick={handleClick}>
        <img src="/share.svg" alt="like" />
        <span>分享</span>
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="已複製到剪貼簿"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  )
}

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
export default ShareButton
