import { useEffect, useState } from 'react'

const MeMarker = ({ map, lat, lng }) => {
  const [marker, setMarker] = useState(null)
  const options = {
    position: {
      lat, lng
    },
    icon: {
      url: '/me.svg',
      // url: '/pins/blue-pin.svg',
      scaledSize: new google.maps.Size(22,22)
      // scaledSize: new google.maps.Size(22, 32),

    }
  }

  useEffect(() => {
    if (!marker) setMarker(new google.maps.Marker())
    return () => {
      if (marker) marker.setMap(null)
    }
  }, [marker])

  useEffect(() => {
    if (marker) marker.setOptions({ map, options })
  }, [map, marker])

  return null  
}

export default MeMarker
