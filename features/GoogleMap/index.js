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
}

const GoogleMap = ({ children }) => {
  const router = useRouter()
  const [mapOptions, setMapOptions] = useState(DEFAULT_SETUP)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    mapIds: [process.env.NEXT_PUBLIC_MAP_ID],
  })
  const { map, setMap } = store(state => ({
    map: state.map,
    setMap: state.setMap
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
    } else {
      console.log("parsed failed")
    }
  }, [])

  function onLoad(map) {
    setMap(map)
  }

  function onIdle() {
    if (!map) return

    const lat = map.center.lat().toFixed(6)
    const lng = map.center.lng().toFixed(6)
    const zoom = map.zoom
    router.push(`@${lat},${lng},${zoom}z`, undefined, { shallow: true })
  }

  function onClick() {}

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
