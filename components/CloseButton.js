import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import { IconButton } from "@mui/material"

const DEFAULT_SX = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "24px",
  "&:hover": {
    cursor: "pointer",
  },
}

const CloseButton = ({ onClick, sx = {} }) => {
  return (
    <IconButton onClick={onClick} sx={{ ...DEFAULT_SX, ...sx }}>
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton
