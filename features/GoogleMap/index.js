import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import store from "stores/store"
import {
  GoogleMap as ReactGoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api"

const DEFAULT_STYLE = {
  width: "100%",
  height: "100%",
}

const DEFAULT_SETUP = {
  center: {
    lat: 23.685859,
    lng: 119.006545,
  },
  zoom: 7.5,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  gestureHandling: "greedy",
  keyboardShortcuts: false,
  disableDefaultUI: true,
}

const GoogleMap = ({ onClick, children }) => {
  const router = useRouter()
  const [mapOptions, setMapOptions] = useState(DEFAULT_SETUP)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    mapIds: [process.env.NEXT_PUBLIC_MAP_ID],
  })
  const {
    map,
    setMap,
    setPlaceId,
    setFocusPlaceId,
    setSearchCenter,
  } = store((state) => ({
    map: state.map,
    setMap: state.setMap,
    setPlaceId: state.setPlaceId,
    setFocusPlaceId: state.setFocusPlaceId,
    setSearchCenter: state.setSearchCenter,
  }))

  useEffect(() => {
    const path = window.location.pathname
    const match = path.match(/@([\d.-]+),([\d.-]+),([\d]+)z/)

    if (match) {
      setMapOptions((cur) => {
        cur.center = {
          lat: +match[1],
          lng: +match[2],
        }
        cur.zoom = +match[3]

        return cur
      })
      setSearchCenter({ lat: +match[1], lng: +match[2] })
    } else {
      console.log("parsed failed")
    }

    if (path.includes("/place/")) {
      const placeId = path.match(/place\/(.*)\/@/)[1]
      setPlaceId(placeId)
      setFocusPlaceId(placeId)
    }
  }, [])

  function onLoad(map) {
    setMap(map)
  }

  function onIdle() {
    if (!map || ["/map", "/m/map", "/new-map"].includes(router.asPath)) return

    const lat = map.center.lat().toFixed(6)
    const lng = map.center.lng().toFixed(6)
    const zoom = map.zoom

    const { pathname, search } = window.location
    let originPart = pathname.split("@")[0]
    if (originPart.slice(-1) !== "/") {
      originPart = `${originPart}/`
    }

    router.push(`${originPart}@${lat},${lng},${zoom}z${search}`, undefined, {
      shallow: true,
    })
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <ReactGoogleMap
      mapContainerStyle={DEFAULT_STYLE}
      options={mapOptions}
      onIdle={onIdle}
      onLoad={onLoad}
      onClick={onClick}
    >
      {children}
    </ReactGoogleMap>
  )
}

export default GoogleMap
