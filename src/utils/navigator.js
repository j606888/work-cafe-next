export async function alreadyGranted() {
  const permission = await navigator.permissions.query({ name: "geolocation" })
  return permission.state === "granted"
}

export async function getCurrentPosition() {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    } catch(err) {
      // TODO, tell user geolocation service failed
      console.log(err)
    }
  } else {
    // TODO, tell user their browser not support geolocation.
    // https://developers.google.com/maps/documentation/javascript/geolocation
    console.log("Your browser not support geolocation")
  }
}
