import { Marker } from "@react-google-maps/api"
import React from "react"

const StoreMarker = ({
  store,
  isFocus,
  isBounce,
  showLabel,
  onClick = () => {},
  onMouseOver = () => {},
  onMouseOut = () => {},
}) => {
  const icon = isFocus ? "/pins/blue-pin.svg" : "/pins/red-pin.svg"
  const position = {
    lat: store.lat,
    lng: store.lng,
  }
  const animation = isBounce ? 1 : null
  const label = showLabel
    ? {
        text: store.name,
        fontSize: "12px",
        className: "labels",
      }
    : null

  return (
    <Marker
      onClick={() => onClick(store.placeId)}
      icon={icon}
      position={position}
      animation={animation}
      label={label}
      onMouseOver={() => onMouseOver(store.placeId)}
      onMouseOut={() => onMouseOut(store.placeId)}
    />
  )
}

export default StoreMarker
