import React from 'react'
import { Dialog as MuiDialog, IconButton } from "@mui/material"
import CloseButton from '@mui/icons-material/Close'
import { colors } from 'constants/styled-theme'

const PaperProps = {
  borderRadius: "20px",
  padding: "34px 38px 24px",
  display: "flex",
  alignItems: "center",
  minWidth: "300px",
  position: "relative",
}

const IconButtonSx = {
  position: "absolute",
  right: "12px",
  top: "12px",
  color: colors.black01,
  "&:hover": {
    cursor: "pointer",
  },
}

const Dialog = ({ open, onClose, children, sx={} }) => {
  const paperProps = { style: { ...PaperProps, ...sx }}

  return (
    <MuiDialog open={open} onClose={onClose} PaperProps={paperProps}>
      <IconButton onClick={onClose} sx={IconButtonSx}>
        <CloseButton />
      </IconButton>
      {children}
    </MuiDialog>
  )
}

export default Dialog
