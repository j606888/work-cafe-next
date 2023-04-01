import { Dialog, Drawer, useMediaQuery } from "@mui/material"

import React from "react"

const MobileDrawerStyle = {
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  maxHeight: "85%",
}

const Wrapper = ({ children, open, onClose }) => {
  const fullScreen = useMediaQuery('(max-width: 720px)')

  if (fullScreen) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        anchor="bottom"
        PaperProps={{ sx: MobileDrawerStyle }}
      >
        {children}
      </Drawer>
    )
  } else {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ style: { borderRadius: "20px", width: "596px" } }}
      >
        {children}
      </Dialog>
    )
  }
}

export default Wrapper
