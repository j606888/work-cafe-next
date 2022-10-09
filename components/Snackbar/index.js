import React, { useState } from "react"
import MuiSnackbar from "@mui/material/Snackbar"

const Snackbar = ({ message = "Give me something", onClose = () => {} }) => {
  const [open, setOpen] = useState(true)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
    onClose()
  }

  return (
    <MuiSnackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
      autoHideDuration={4000}
      message={message}
    />
  )
}

export default Snackbar
