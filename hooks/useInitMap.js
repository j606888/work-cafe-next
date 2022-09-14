import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isEmpty } from 'lodash'

const DEFAULT_SETUP = {
  center: {
    lat: 23.546162,
    lng: 120.640213,
  },
  zoom: 8,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  styles: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
}

const useInitMap = () => {
  const [mapSettings, setMapSettings] = useState(DEFAULT_SETUP)
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const urlLocation = router.query.location
      const lastLocation = localStorage.getItem('lastLocation')
      const location = _.isEmpty(urlLocation) ? [lastLocation] : urlLocation

      if (location) {
        const pureString = location[0]
        const re = /@(?<lat>\d+(\.\d+)?),(?<lng>\d+(\.\d+)?),(?<zoom>\d+)z/
        const match = re.exec(pureString)
  
        if (match) {
          const lat = +match.groups.lat
          const lng = +match.groups.lng
          const zoom = +match.groups.zoom
  
          setMapSettings((cur) => ({ ...cur, zoom, center: { lat, lng } }))
        }
      }

      setIsReady(true)
    }
  }, [router, isReady])

  return { mapSettings, isReady }
}

export default useInitMap
