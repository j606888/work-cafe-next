import { useState } from "react"
import useMapStoreV2 from "stores/useMapStoreV2"

const useFindMe = () => {
  const [loading, setLoading] = useState(false)
  const myLocation = useMapStoreV2(store => store.myLocation)
  const setMyLocation = useMapStoreV2(store => store.setMyLocation)

  async function findMe() {
    if (myLocation) return myLocation

    setLoading(true)
    const { success, latLng, failedReason } = await _getCurrentPosition()
    setLoading(false)

    if (success) {
      setMyLocation(latLng)
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

export default useFindMe
