import { useEffect, useState } from "react"

export default function Marker({ map, options, id, onClick }) {
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    if (map && !marker) setMarker(new window.google.maps.Marker())

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [map, marker])

  useEffect(() => {
    if (marker && map) {
      options.map = map
      marker.setOptions(options)

      if (onClick)  marker.addListener("click", () => onClick(id))
    }
  }, [marker, map])

  return null
}
