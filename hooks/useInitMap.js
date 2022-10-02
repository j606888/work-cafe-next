import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import useStoreStore from "./useStoreStore"
import _ from 'lodash'

const DEFAULT_SETUP = {
  center: {
    lat: 23.546162,
    lng: 120.640213,
  },
  zoom: 8,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  gestureHandling: 'greedy'
}

const useInitMap = () => {
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const [mapSettings, setMapSettings] = useState(DEFAULT_SETUP)
  const [isReady, setIsReady] = useState(false)
  const [map, setMap] = useState(null)
  const myLocation = useRef(null)
  const router = useRouter()

  useEffect(() => {
    console.log({ router })
    if (router && router.isReady && !isReady) {
      const urlLocation = router.query.location
      const lastLocation = localStorage.getItem("lastLocation")
      const location = _.isEmpty(urlLocation) ? [lastLocation] : urlLocation

      if (location) {
        const pureString = location[0]
        const re = /@(?<lat>\d+(\.\d+)?),(?<lng>\d+(\.\d+)?),(?<zoom>\d+)z/
        const match = re.exec(pureString)

        const placeId = location[1]
        if (placeId) {
          setPlaceId(placeId)
        }

        if (match) {
          const lat = +match.groups.lat
          const lng = +match.groups.lng
          const zoom = +match.groups.zoom

          setMapSettings((cur) => ({ ...cur, zoom, center: { lat, lng } }))
        }
      }

      setIsReady(true)
      console.log("SET SUCCESS");
    }
  }, [router, isReady])

  return { mapSettings, isReady, map, setMap, myLocation }
}

export default useInitMap
