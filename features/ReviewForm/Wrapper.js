import { Dialog, Drawer, useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import React from "react"

const MobileDrawerStyle = {
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  maxHeight: "85%",
  overflow: "auto"
}

const Wrapper = ({ children, open, onClose }) => {
  const fullScreen = useMediaQuery(devices.mobileXl)

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
