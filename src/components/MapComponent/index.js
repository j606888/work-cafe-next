import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 64px - 3rem);
  width: 100%;
`

const MapComponent = () => {
  const ref = useRef(null)
  const [map, setMap] = useState()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
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
      }))
    }
  }, [ref, map])

  return <Container ref={ref} />
}

export default MapComponent
