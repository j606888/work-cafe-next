import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import { getCurrentPosition } from "utils/helper"
import store from "stores/store"
import { grey02, orange100 } from "constants/color"
import { devices } from "constants/styled-theme"

const MyPosition = () => {
  const [color, setColor] = useState(grey02)
  const { map, setMyLocation } = store((state) => ({
    map: state.map,
    setMyLocation: state.setMyLocation,
  }))

  async function handleClick() {
    const intervalId = setInterval(() => {
      setColor((preColor) => (preColor === grey02 ? orange100 : grey02))
    }, 500)

    const { success, latLng } = await getCurrentPosition()

    if (success) {
      setMyLocation(latLng)
      map.setZoom(15)
      map.panTo(latLng)
      setColor(orange100)
    } else {
      setColor("#cccccc")
    }

    clearInterval(intervalId)
  }

  return (
    <Container onClick={handleClick}>
      <MyLocationIcon
        sx={{
          color: color,
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid #e8e6e4;
  border-radius: 12px;
  right: 20px;
  bottom: 28px;
  cursor: pointer;

  @media ${devices.mobileXl} {
    width: 40px;
    height: 40px;
    right: 12px;
    bottom: 20px;
  }
`

export default MyPosition
