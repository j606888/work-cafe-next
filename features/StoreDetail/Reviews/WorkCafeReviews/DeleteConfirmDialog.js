import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import React from "react"

const DeleteConfirmDialog = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>刪除評論</DialogTitle>
      <DialogContent>
        <DialogContentText>無法復原已刪除的評論。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#555"}}>取消</Button>
        <Button onClick={onDelete} autoFocus>刪除</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
