import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 64px - 3rem);
  width: 100%;
`
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

const Map = ({ children }) => {
  const ref = useRef(null)
  const [map, setMap] = useState()
  
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, DEFAULT_SETUP))
    }
  })

  return (
    <>
      <Container ref={ref} />
      {React.Children.map(children, (child) => {
          return React.cloneElement(child, { map })
      })}
    </>
  )
}

export default Map
