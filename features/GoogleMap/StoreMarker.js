import { Marker } from "@react-google-maps/api"
import React, { useState } from "react"

const StoreMarker = ({
  store,
  isFocus,
  isBounce,
  showLabel,
  isBookmark,
  mapLng = 0,
  mapLat = 0,
  onClick = () => {},
  // onMouseOver = () => {},
  // onMouseOut = () => {},
}) => {
  const [mouseOver, setMouseOver] = useState(false)

  const icon = _iconColor({
    isFocus,
    wakeUp: store.wakeUp,
    isBookmark,
    isBounce,
    mouseOver,
  })
  const position = {
    lat: store.lat,
    lng: store.lng,
  }
  const animation = isBounce ? 1 : null
  const angle = _angle(mapLng, mapLat, store.lng, store.lat)
  const label = _label({
    store,
    showLabel,
    isFocus,
    angle,
    mouseOver,
    isBounce,
  })

  return (
    <Marker
      onClick={() => onClick(store.placeId)}
      icon={icon}
      position={position}
      animation={animation}
      label={label}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      // onMouseOver={() => onMouseOver(store.placeId)}
      // onMouseOut={() => onMouseOut(store.placeId)}
      zIndex={isBounce || isFocus ? 10 : 1}
    />
  )
}

export default StoreMarker

function _iconColor({ isFocus, wakeUp, isBookmark, isBounce, mouseOver }) {
  if (isFocus || isBounce || mouseOver) return "/v2/pin-green.svg"
  if (isBookmark) return "/pins/like-pin.svg"
  if (wakeUp) return "/pins/black-pin.svg"
  return "/pins/black-pin.svg"
}

function _label({ showLabel, store, isFocus, angle, mouseOver, isBounce }) {
  if (isFocus || mouseOver || isBounce) {
    return {
      text: store.name,
      fontSize: "12px",
      className: "labels-focus",
    }
  }
  if (showLabel) {
    // let className
    // if (angle <= 45 || angle > 315) className = 'right'
    // else if (angle > 45 && angle <= 135) className = 'top'
    // else if (angle > 135 && angle <= 225) className = 'left'
    // else if (angle > 225 && angle <= 315) className = 'bottom'
    const className = "right"

    return {
      text: _removeTextInParenthesis(store.name),
      fontSize: "12px",
      className: `labels ${className}`,
    }
  }

  return null
}

function _removeTextInParenthesis (str) {
  return str.replace(/\s*\([^\)]*\)/, "")
}

function _angle(cx, cy, ex, ey) {
    var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;

}
