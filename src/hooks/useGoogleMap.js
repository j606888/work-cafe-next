import { useEffect, useState } from "react"

const DEFAULT_SETUP = {
  center: {
    lat: 22.9918511,
    lng: 120.2066457,
  },
  zoom: 16,
  fullscreenControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
}

export default function useGoogleMap({ ref }) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      const settings = DEFAULT_SETUP
      const googleMap = new window.google.maps.Map(ref.current, settings)

      setMap(googleMap)
    }
  }, [ref, map])

  return map
}
