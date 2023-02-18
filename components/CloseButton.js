import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import { IconButton } from "@mui/material"

const CloseButton = (onClick) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "24px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton
