import store from "stores/store"
import { Marker } from "@react-google-maps/api"

const MyLocationMarker = () => {
  const { myLocation } = store((state) => ({
    myLocation: state.myLocation,
  }))

  if (!myLocation) return null

  return (
    <Marker
      position={myLocation}
      icon={{
        url: "/me.svg",
        scaledSize: new google.maps.Size(48, 48),
      }}
      zIndex={100}
    />
  )
}

export default MyLocationMarker
