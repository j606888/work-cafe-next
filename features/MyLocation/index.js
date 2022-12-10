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
  let result = {
    success: false,
    latLng: {},
    failedReason: "",
  }

  if (!navigator.geolocation) {
    result.failedReason = "Your browser not support geolocation"
    return result
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    result.success = true
    result.latLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
  } catch (err) {
    result.failedReason = err.message
  }
  return result
}

const MyLocation = ({ className, onClick = () => {} }) => {
  const [location, setLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userClick, setUserClick] = useState(false)

  const handleClick = async () => {
    if (!location) {
      setUserClick(true)
      setIsLoading(true)
      const { success, latLng, failedReason } = await getCurrentPosition()
      setIsLoading(false)
      if (success) {
        setLocation(latLng)
        onClick(latLng)
      } else {
        console.warn(failedReason)
      }
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

      const { latLng } = await getCurrentPosition()
      setLocation(latLng)
      setIsLoading(false)
    })()
  }, [])

  return (
    <Container
      className={className}
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
