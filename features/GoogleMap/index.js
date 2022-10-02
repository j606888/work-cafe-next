import React from "react"
import {
  GoogleMap as ReactGoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100%"
}

const GoogleMap = ({
  children,
  style,
  mapSettings,
  onIdle = () => {},
  onLoad = () => {},
  onClick = () => {},
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <ReactGoogleMap
      mapContainerStyle={style || containerStyle}
      onIdle={onIdle}
      onLoad={onLoad}
      options={mapSettings}
      onClick={onClick}
    >
      {children}
    </ReactGoogleMap>
  )
}

export default GoogleMap
