import { useMediaQuery } from "@mui/material"
import { useState } from "react"
import useStoreStore from "stores/useStoreStore"
import HelpUsModal from "./HelpUsModal"
import { Container, HelpButton } from "./styled"

const HelpUs = () => {
  const [open, setOpen] = useState(false)
  const stores = useStoreStore(state => state.stores)
  const placeId = useStoreStore(state => state.placeId)
  const fullScreen = useMediaQuery('(max-width:390px)');
  const hide = _calcHide(stores, placeId, fullScreen)

  const handleClose = () => {
    setOpen(false)
  }

  if (hide) return null

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

function _calcHide(stores, placeId, fullScreen) {
  if (!fullScreen) return false
  return !!(placeId || (stores && stores.length > 0))
}
export default HelpUs
