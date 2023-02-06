import { Snackbar } from '@mui/material'
import React from 'react'
import create from 'zustand'

export const snackbarStore = create((set) => ({
  open: false,
  openSnackbar: () => set((state) => ({ ...state, open: true })),
  closeSnackbar: () => set((state) => ({ ...state, open: false })),
  message: "",
  setMessage: (message) => set((state) => ({ ...state, message}))
}))

const GlobalSnackbar = () => {
  const { open, closeSnackbar, message } = snackbarStore((state) => ({
    open: state.open,
    closeSnackbar: state.closeSnackbar,
    message: state.message,
  }))

  function handleClose() {
    closeSnackbar()
  }

  return (
    <Snackbar
      open={open}
      message={message}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={3000}
    />
  )
}

export default GlobalSnackbar
