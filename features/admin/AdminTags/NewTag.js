import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import TagApis from "api/admin/tag"
import React, { useRef, useState } from "react"

const NewTag = ({ onCreate }) => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef()

  function handleClose() {
    setOpen(false)
  }

  async function handleCreate() {
    const name = inputRef.current.value
    await TagApis.createTag({ name })
    setOpen(false)
    onCreate()
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{ position: "absolute", top: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        新增
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增標籤</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="standard"
            label="標籤名稱"
            inputRef={inputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate}>建立</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewTag
