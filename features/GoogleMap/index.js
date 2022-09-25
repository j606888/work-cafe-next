import React, { useMemo } from "react"
import {
  GoogleMap as ReactGoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100vh",
}

const GoogleMap = ({ children, onIdle = () => {}, onLoad = () => {} }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  })
  const center = useMemo(() => ({ lat: 23.546162, lng: 120.640213 }), [])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <ReactGoogleMap
      zoom={8}
      center={center}
      mapContainerStyle={containerStyle}
      onIdle={onIdle}
      onLoad={onLoad}
    >
      {children}
    </ReactGoogleMap>
  )
}

export default GoogleMap
