import { useEffect, useState } from "react"

export default function Marker({ map, options, id, store, onClick, onMouseover, onMouseout }) {
  const [marker, setMarker] = useState(null)
  const [windowInfo, setWindowInfo] = useState(null)

  if (marker) {
    if (options.animation) {
      marker.setOptions(options)
    } else {
      marker.setAnimation(null)
    }
  }

  useEffect(() => {
    if (map && !marker) {
      setMarker(new window.google.maps.Marker())
      setWindowInfo(
        new google.maps.InfoWindow({
          content: store.name,
        })
      )
    }

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [map, marker, store.name])

  useEffect(() => {
    if (marker && map) {
      options.map = map
      marker.setOptions(options)

      if (onClick) marker.addListener("click", () => onClick(id))
      if (onMouseover) marker.addListener("mouseover", () => {
        onMouseover(id)
        windowInfo.open({
          anchor: marker,
          map,
        })
      })
      if (onMouseout) marker.addListener("mouseout", () => {
        onMouseout(id)
        windowInfo.close()
      })
    }
  }, [marker, map])

  return null
}
