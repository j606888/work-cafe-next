import { useEffect, useState } from "react"

export default function Marker({ map, options, onClick }) {
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    if (map && !marker) {
      setMarker(new window.google.maps.Marker())
    }

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [map, marker])

  useEffect(() => {
    if (marker && map) {
      options.map = map
      marker.setOptions(options)
    }
  }, [marker, map])

  // useEffect(() => {
  //   if (!map) return

  //   const marker =
  //   const { id, name, lat, lng } = item
  //   marker.setOptions({
  //     position: {
  //       lat,
  //       lng,
  //     },
  //     // label: {text: name, color: '#999', fontSize: '8px', fontWeight: 'bold'},
  //     label: name,
  //     map: map,
  //   })
  //     // marker.id = id

  //     // if (onClick) {
  //     //   marker.addListener("click", () => onClick(id))
  //     // }
  //   setMarkers(itemMarkers)
  // }, [map, items, onClick])

  return null
}
