import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isEmpty } from "lodash"

const REGEX = /@(?<lat>\d+(\.\d+)?),(?<lng>\d+(\.\d+)?),(?<zoom>\d+)z/
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
  gestureHandling: "greedy",
  keyboardShortcuts: false,
}

const useInitMap = () => {
  const [placeIdFromUrl, setPlaceIdFromUrl] = useState(null)
  const [mapSettings, setMapSettings] = useState(DEFAULT_SETUP)
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router && router.isReady && !isReady) {
      const urlLocation = router.query.location
      const lastLocation = _getLocalStorage("lastLocation")
      const location = isEmpty(urlLocation) ? [lastLocation] : urlLocation

      if (location) {
        const pureString = location[0]
        const match = REGEX.exec(pureString)
        const placeId = location[1]
        if (placeId) setPlaceIdFromUrl(placeId)

        if (match) {
          const { zoom, center } = _parseMatch(match)
          setMapSettings((cur) => ({ ...cur, zoom, center }))
        }
      }

      setIsReady(true)
    }
  }, [router, isReady])

  return { mapSettings, isReady, placeIdFromUrl }
}

function _getLocalStorage(key) {
  localStorage.getItem(key)
}

function _parseMatch(match) {
  const zoom = +match.groups.zoom
  const center = {
    lat: +match.groups.lat,
    lng: +match.groups.lng,
  }

  return { zoom, center }
}

export default useInitMap
