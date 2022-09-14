import React from "react"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import { useState } from "react"
import { useEffect } from "react"
import { Tooltip } from "@mui/material"
import { Container } from "./styled"

export async function alreadyGranted() {
  const permission = await navigator.permissions.query({ name: "geolocation" })
  return permission.state === "granted"
}

async function getCurrentPosition() {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log("Your browser not support geolocation")
  }
}

const MyLocation = ({ onClick = () => {} }) => {
  const [location, setLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userClick, setUserClick] = useState(false)

  const handleClick = async () => {
    if (!location) {
      setUserClick(true)
      setIsLoading(true)
      const { lat, lng } = await getCurrentPosition()
      setLocation({ lat, lng })
      setIsLoading(false)
      onClick({ lat, lng })
    } else {
      onClick(location)
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const already = await alreadyGranted()
      if (!already) {
        setIsLoading(false)
        return
      }

      const { lat, lng } = await getCurrentPosition()
      setLocation({ lat, lng })
      setIsLoading(false)
    })()
  }, [])

  return (
    <Container
      onClick={handleClick}
      isLoading={isLoading}
      hasLocation={!!location}
    >
      {isLoading && userClick ? (
        <Tooltip open={true} title="搜尋你的位置中" arrow placement="left">
          <MyLocationIcon />
        </Tooltip>
      ) : (
        <MyLocationIcon />
      )}
    </Container>
  )
}

export default MyLocation
