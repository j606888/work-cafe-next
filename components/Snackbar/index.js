import React, { useState } from "react"
import MuiSnackbar from "@mui/material/Snackbar"
import { Alert } from "@mui/material"

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
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <Alert onClose={handleClose} security="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
