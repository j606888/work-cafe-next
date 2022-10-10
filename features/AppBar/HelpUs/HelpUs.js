import { useState } from "react"
import HelpUsModal from "./HelpUsModal"
import { Container, HelpButton } from "./styled"

const HelpUs = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Container>
        <span>我們需要你的幫助，讓這個網站更好用！</span>
        <HelpButton onClick={() => setOpen(true)}>怎麼幫？</HelpButton>
      </Container>
      <HelpUsModal open={open} onClose={handleClose} />
    </>
  )
}

export default HelpUs
