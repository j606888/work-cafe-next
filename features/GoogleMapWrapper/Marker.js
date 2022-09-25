import { useEffect, useState } from "react"

const markerIcon = (focus = false) => {
  return {
    url: focus ? "/pins/blue-pin.svg" : "/pins/red-pin.svg",
    scaledSize: new google.maps.Size(22, 32),
  }
}

export default function Marker({
  map,
  store,
  bounce = false,
  focus = false,
  showLabel = false,
  onClick = () => {},
}) {
  const [marker, setMarker] = useState(null)
  const options = {
    position: {
      lat: store.lat,
      lng: store.lng,
    },
    icon: markerIcon(focus),
  }
  if (showLabel) {
    options.label = {
      text: store.name,
      fontSize: "12px",
      className: "labels",
    }
  } else {
    options.label = null
  }

  if (marker) {
    const animation = bounce ? google.maps.Animation.BOUNCE : null
    marker.setAnimation(animation)
  }

  useEffect(() => {
    if (map && !marker) {
      setMarker(new window.google.maps.Marker())
    }

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [map, marker, store.name])

  useEffect(() => {
    if (map && marker) {
      setMarker(null)
    }
  }, [showLabel])

  useEffect(() => {
    if (marker && map) {
      options.map = map
      marker.setOptions(options)

      marker.addListener("click", () => onClick(store.placeId))
      marker.addListener("mouseover", () => {
        options.label = {
          text: store.name,
          fontSize: "12px",
          className: "labels",
        }
        marker.setOptions(options)
      })
      marker.addListener("mouseout", () => {
        if (!showLabel) {
          options.label = null
          marker.setOptions(options)
        }
      })
    }
  }, [marker, map, options.icon, showLabel])

  return null
}
