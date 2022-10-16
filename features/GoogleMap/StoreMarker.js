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
  const icon = _iconColor({ isFocus, wakeUp: store.wakeUp })
  const position = {
    lat: store.lat,
    lng: store.lng,
  }
  const animation = isBounce ? 1 : null
  const label = _label({ store, showLabel, isFocus })

  return (
    <Marker
      onClick={() => onClick(store.placeId)}
      icon={icon}
      position={position}
      // animation={animation}
      label={label}
      onMouseOver={() => onMouseOver(store.placeId)}
      onMouseOut={() => onMouseOut(store.placeId)}
    />
  )
}

export default StoreMarker

function _iconColor({ isFocus, wakeUp }) {
  if (isFocus) return "/pins/blue-pin.svg"
  if (wakeUp) return "/pins/red-pin.svg"
  return "/pins/grey-pin.svg"
}

function _label({ showLabel, store, isFocus }) {
  if (showLabel || isFocus) {
    return {
      text: store.name,
      fontSize: "12px",
      className: "labels",
    }
  }

  return null
}
