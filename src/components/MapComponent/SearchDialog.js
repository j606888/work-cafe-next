import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export default function SearchDialog({ open, handleClose, handleSearch }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { position: 'fixed', top: '15%', left: '50%', transform: 'translateX(-50%)'}}}
    >
      <DialogTitle id="alert-dialog-title">Want to search here?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The Max results is <b>30</b>, make sure your radius is not too wide
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSearch} autoFocus>
          Search
        </Button>
      </DialogActions>
    </Dialog>
  )
}
