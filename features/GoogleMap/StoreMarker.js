import { Marker } from "@react-google-maps/api"
import React from "react"

const StoreMarker = ({
  store,
  isFocus,
  isBounce,
  showLabel,
  isBookmark,
  mapLng = 0,
  onClick = () => {},
  onMouseOver = () => {},
  onMouseOut = () => {},
}) => {
  const icon = _iconColor({ isFocus, wakeUp: store.wakeUp, isBookmark })
  const position = {
    lat: store.lat,
    lng: store.lng,
  }
  const animation = isBounce ? 1 : null
  const label = _label({ mapLng, store, showLabel, isFocus, lng: store.lng })

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

function _iconColor({ isFocus, wakeUp, isBookmark }) {
  if (isFocus) return "/pins/target-pin.svg"
  if (isBookmark) return "/pins/like-pin.svg"
  if (wakeUp) return "/pins/black-pin.svg"
  return "/pins/black-pin.svg"
}

function _label({ mapLng, showLabel, store, isFocus, lng }) {
  if (isFocus) {
    return {
      text: store.name,
      fontSize: "12px",
      className: "labels-focus",
    }
  }
  if (showLabel) {
    const className = mapLng > lng ? 'labels-left' : 'labels-right'
    return {
      text: store.name,
      fontSize: "12px",
      className: className,
    }
  }

  return null
}
