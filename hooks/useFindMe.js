import { useState } from "react"

const useFindMe = () => {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null)

  async function findMe() {
    if (location) return location

    setLoading(true)
    const { success, latLng, failedReason } = await _getCurrentPosition()
    setLoading(false)

    if (success) {
      setLocation(latLng)
      return latLng
    } else {
      console.warn(failedReason)
    }
  }

  return { findMe, loading }
}

async function _getCurrentPosition() {
  let result = {
    success: false,
    latLng: {},
    failedReason: ""
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

async function _alreadyGranted() {
  const permission = await navigator.permissions.query({ name: "geolocation" })
  return permission.state === "granted"
}

export default useFindMe
