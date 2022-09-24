import { useEffect, useState } from "react"
import { truncate } from 'lodash'

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
  onClick = () => {},
  onMouseover = () => {},
  onMouseout = () => {},
}) {
  const [marker, setMarker] = useState(null)
  const [windowInfo, setWindowInfo] = useState(null)
  const options = {
    position: {
      lat: store.lat,
      lng: store.lng,
    },
    icon: markerIcon(focus),
    label: {
      text: store.name,
      fontSize: '12px',
      className: 'labels'
    }
  }

  if (marker) {
    const animation = bounce ? google.maps.Animation.BOUNCE : null
    marker.setAnimation(animation)
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

      marker.addListener("click", () => onClick(store.placeId))
      marker.addListener("mouseover", () => {
        windowInfo.open({
          anchor: marker,
          map,
        })
        onMouseover(store.placeId)
      })
      marker.addListener("mouseout", () => {
        windowInfo.close()
        onMouseout(store.placeId)
      })
    }
  }, [marker, map, options.icon])

  return null
}
