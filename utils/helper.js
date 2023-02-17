export function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export async function getCurrentPosition() {
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
