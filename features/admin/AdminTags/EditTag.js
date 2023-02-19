import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import TagApis from "api/admin/tag"
import React, { useRef } from "react"

const EditTag = ({ tag, onClose, editTagId, onEdit }) => {
  const inputRef = useRef()

  function handleClose() {
    onClose()
  }

  async function handleEditSubmit() {
    await TagApis.updateTag({ id: tag.id, name: inputRef.current.value })
    onClose()
    onEdit()
  }

  return (
    <>
      <Dialog open={editTagId == tag.id} onClose={handleClose}>
        <DialogTitle>
          Edit Tag {tag.id}({tag.name})
        </DialogTitle>
        <DialogContent>
          <TextField defaultValue={tag.name} inputRef={inputRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSubmit}>更新</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditTag
