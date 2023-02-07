import React, { useState, useEffect } from "react"
import { useMediaQuery } from "@material-ui/core"
import Modal from "@material-ui/core/Modal"
import Drawer from "@material-ui/core/Drawer"

function withResponsiveDisplay(WrappedComponent) {
  return function ResponsiveDisplay(props) {
    const matches = useMediaQuery("(min-width:600px)")
    const [isOpen, setIsOpen] = useState(false)

    function handleOpen() {
      setIsOpen(true)
    }

    function handleClose() {
      setIsOpen(false)
    }

    return (
      <>
        {matches ? (
          <Modal open={isOpen} onClose={handleClose}>
            <WrappedComponent {...props} />
          </Modal>
        ) : (
          <Drawer open={isOpen} onClose={handleClose}>
            <WrappedComponent {...props} />
          </Drawer>
        )}
        <button onClick={handleOpen}>Open Filter Form</button>
      </>
    )
  }
}

export default withResponsiveDisplay
