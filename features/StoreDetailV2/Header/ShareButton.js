import React, { useState } from "react"
import { Button } from "./styled"
import ShareIcon from '@mui/icons-material/Share';
import copy from "copy-to-clipboard"
import { Snackbar } from "@mui/material"

const ShareButton = () => {
  const [open, setOpen] = useState(false)

  function handleClick() {
    const url = window.location.href
    copy(url)
    setOpen(true)
  }

  function handleClose() {
    setOpen()
  }

  return (
    <>
      <Button onClick={handleClick}>
        <ShareIcon />
        <span>分享</span>
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="已複製到剪貼簿"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
      />
    </>
  )
}

export default ShareButton
