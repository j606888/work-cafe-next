import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { devices } from "constants/styled-theme"
import { useRouter } from "next/router"
import store, { PANEL_TYPES } from "stores/store"

const NearbySearch = () => {
  const { map, setPanelType, myLocation, setMyLocation, setSearchCenter } = store((state) => ({
    map: state.map,
    setPanelType: state.setPanelType,
    myLocation: state.myLocation,
    setMyLocation: state.setMyLocation,
    setSearchCenter: state.setSearchCenter,
  }))
  const myPositionRef = useRef(null)
  const router = useRouter()

  const handleClick = async () => {
    try {
      let location
      if (myLocation) {
        location = myLocation
      } else {
        location = await _getCurrentPosition()
      }
      router.push(`/m/@${location.lat},${location.lng},15z`)
      setMyLocation(location)
      setSearchCenter(location)
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    const getPosition = async () => {
      const already = await alreadyGranted()
      if (!already) return

      const latLng = await _getCurrentPosition()
      myPositionRef.current = latLng
    }
    getPosition()
  }, [])

  return (
    <Container>
      <Content>
        <h3>正在找尋附近的咖啡店？</h3>
        <p>須許可此網頁存取你的GPS定位</p>
      </Content>
      <SearchBtn onClick={handleClick}>搜尋附近</SearchBtn>
    </Container>
  )
}

async function alreadyGranted() {
  const permission = await navigator.permissions.query({ name: "geolocation" })
  return permission.state === "granted"
}

async function _getCurrentPosition() {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
  const latLng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }
  return latLng
}

function handleError(err) {
  if (err instanceof GeolocationPositionError) {
    console.log("You might block the Geolocation, Please open it and try again")
  } else {
    console.log(err)
  }
}

const Container = styled.div`
  margin-top: 43px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 112px;
  padding: 30px;
  background-color: #fff7ee;
  border-radius: 28px;
  align-items: center;
  justify-content: space-between;

  @media ${devices.mobileXl} {
    display: block;
    text-align: center;
    height: auto;
    box-sizing: border-box;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    color: #222120;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    margin: 0;
  }

  p {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #222120;
  }

  @media ${devices.mobileXl} {
    p {
      display: block;
    }
  }
`

const SearchBtn = styled.button`
  background-color: #222120;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  width: 120px;
  height: 52px;
  color: #ffffff;
  font-size: 18px;
  line-height: 25px;

  @media ${devices.mobileXl} {
    width: auto;
    height: auto;
    padding: 12px 20px;
    font-size: 16px;
    margin-top: 30px;
  }
`

export default NearbySearch
