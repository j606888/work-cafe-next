import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material"
import React from "react"
import { useState } from "react"
import NewStoreRequestApi from "api/new-store-requests"

const NewStoreRequest = ({ open, onClose = () => {} }) => {
  const [content, setContent] = useState("")
  const [isSubmit, setIsSubmit] = useState(false)

  const handleClose = () => {
    onClose()
  }
  const handleSubmit = async () => {
    await NewStoreRequestApi.create(content)
    setContent("")
    setIsSubmit(true)
  }
  const handleChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      {isSubmit ? (
        <>
          <DialogTitle>感謝您的幫助，我們會盡快新增的！</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              回到地圖
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>找不到店家嗎？</DialogTitle>
          <DialogContent>
            <DialogContentText>
              請提供該店家的資訊（GoogleMap連結
              或是店家名稱地址都可以），我們會盡快新增上這間店的！
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="店家資訊"
              fullWidth
              variant="standard"
              multiline
              value={content}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={content.length === 0}
            >
              送出
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default NewStoreRequest
