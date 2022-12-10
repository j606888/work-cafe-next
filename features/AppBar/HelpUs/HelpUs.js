import { useMediaQuery } from "@mui/material"
import { useState } from "react"
import useStoreStore from "stores/useStoreStore"
import useStoreSWR from "stores/useStoreSWR"
import HelpUsModal from "./HelpUsModal"
import { devices } from "constant/styled-theme"
import styled from "styled-components"

const HEIGHT = {
  normal: "40px",
  mobileXl: "32px",
}

const HelpUs = () => {
  const [open, setOpen] = useState(false)
  const { data: stores } = useStoreSWR()
  const placeId = useStoreStore((state) => state.placeId)
  const fullScreen = useMediaQuery(devices.mobileXl)
  const { isLoading } = useStoreSWR()
  const hide = _calcHide(stores, placeId, fullScreen, isLoading)

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

function _calcHide(stores, placeId, fullScreen, isLoading) {
  if (!fullScreen) return false
  return !!(placeId || (stores && stores.length > 0) || isLoading)
}

const Container = styled.div`
  text-align: center;
  background: #222120;
  height: ${HEIGHT.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;

  @media ${devices.mobileXl} {
    height: ${HEIGHT.mobileXl};
    font-size: 12px;
    font-weight: 500;
  }
`

const HelpButton = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: #fff;

  @media ${devices.mobileXl} {
    font-size: 12px;
  }
`

export default HelpUs
