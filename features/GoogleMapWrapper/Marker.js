import { useEffect, useState } from "react"
import { MarkerWithLabel } from "@googlemaps/markerwithlabel"
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
  }

  if (marker) {
    const animation = bounce ? google.maps.Animation.BOUNCE : null
    marker.setAnimation(animation)
  }

  useEffect(() => {
    if (map && !marker) {
      setMarker(
        new MarkerWithLabel({
          labelContent: truncate(store.name),
          labelAnchor: new google.maps.Point(15, -30),
          labelStyle: { opacity: 1.0 },
          labelClass: "labels",
        })
      )
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
