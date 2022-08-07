import * as React from "react"
import Box from "@mui/material/Box"
import MuiModal from "@mui/material/Modal"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
}

export default function Modal({ open, handleClose, children }) {
  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          { children }
        </Box>
      </MuiModal>
    </div>
  )
}
