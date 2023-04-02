import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import store from "stores/store"
import { CircularProgress } from "@mui/material"
import mixpanel from "mixpanel-browser"

const NearbySearch = () => {
  const [loading, setLoading] = useState(false)
  const { map, myLocation, setMyLocation, setSearchCenter } = store(
    (state) => ({
      map: state.map,
      myLocation: state.myLocation,
      setMyLocation: state.setMyLocation,
      setSearchCenter: state.setSearchCenter,
    })
  )
  const myPositionRef = useRef(null)
  const router = useRouter()

  const handleClick = async () => {
    if (loading) return

    mixpanel.track("search-nearby")

    setLoading(true)
    try {
      let location
      if (myLocation) {
        location = myLocation
      } else {
        location = await _getCurrentPosition()
      }

      let path = `/map/@${location.lat},${location.lng},15z`
      router.push(path)

      map.setZoom(15)
      map.panTo(location)

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
      <SearchBtn onClick={handleClick}>
        {loading ? (
          <CircularProgress size={28} sx={{ color: "#FFFFFF" }} />
        ) : (
          "搜尋附近"
        )}
      </SearchBtn>
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
  background-color: ${({ theme }) => theme.colors.green03};

  border-radius: 28px;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
    color: ${({ theme }) => theme.colors.black01};
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
    color: ${({ theme }) => theme.colors.black01};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    p {
      display: block;
    }
  }
`

const SearchBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.black01};
  border: none;
  cursor: pointer;
  border-radius: 12px;
  width: 120px;
  height: 52px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-left: auto;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
    height: auto;
    padding: 12px 20px;
    font-size: 16px;
    margin: 30px auto 0;
  }
`

export default NearbySearch
