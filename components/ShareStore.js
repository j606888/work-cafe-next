import { Box, Button, TextField, Typography } from "@mui/material"
import { grey02 } from "constants/color"
import { snackbarStore } from "features/GlobalSnackbar"
import React from "react"
import Dialog from "./Dialog"
import copy from "copy-to-clipboard"

const ShareStore = ({ open, onClose, store }) => {
  const { setMessage } = snackbarStore((state) => ({
    openSnackbar: state.openSnackbar,
    setMessage: state.setMessage,
  }))
  const origin = window.location.origin
  const shareLink = `${origin}/share/${store.placeId}`

  function handleShare() {
    copy(shareLink)
    setMessage("已複製到剪貼簿")
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        textAlign: "left",
        alignItems: "start",
        gap: "16px",
        width: "480px",
      }}
    >
      <Typography variant="h6">分享</Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <img src={store.photos[0]} alt={store.name} width={64} height={64} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle2">{store.name}</Typography>
          <Typography variant="body2" sx={{ color: grey02 }}>
            {store.address}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%'}}>
        <Typography variant="body2" sx={{ color: grey02 }}>
          分享連結
        </Typography>
        <Box
          sx={{ display: "flex", width: "100%", gap: 2, alignItems: "center" }}
        >
          <TextField
            defaultValue={shareLink}
            inputProps={{ readOnly: true, style: { fontSize: 14 } }}
            variant="standard"
            sx={{ flex: 1 }}
            size="small"
          />
          <Button onClick={handleShare}>複製連結</Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ShareStore
