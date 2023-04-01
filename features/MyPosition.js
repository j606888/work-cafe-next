import React, { useState } from "react"
import styled from "styled-components"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import { getCurrentPosition } from "utils/helper"
import store from "stores/store"
import { colors } from "constants/styled-theme"

const MyPosition = () => {
  const [color, setColor] = useState(colors.black02)
  const { map, setMyLocation } = store((state) => ({
    map: state.map,
    setMyLocation: state.setMyLocation,
  }))

  async function handleClick() {
    const intervalId = setInterval(() => {
      setColor((preColor) => (preColor === colors.black02 ? colors.green01 : colors.black02))
    }, 500)

    const { success, latLng } = await getCurrentPosition()

    if (success) {
      setMyLocation(latLng)
      map.setZoom(15)
      map.panTo(latLng)
      setColor(colors.green01)
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    right: 12px;
    bottom: 20px;
  }
`

export default MyPosition
