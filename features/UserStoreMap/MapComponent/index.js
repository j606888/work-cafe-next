import React, { useEffect, useRef } from "react"
import styled from "styled-components"

// 56px = Header height
const Container = styled.div`
  height: calc(100vh - 56px);
  width: 100%;
`

const DEFAULT_SETUP = {
  center: {
    lat: 23.546162,
    lng: 120.6402133,
  },
  zoom: 8,
  fullscreenControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
}

const MapComponent = ({ map, setMap, children }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, DEFAULT_SETUP))
    }
  }, [ref, map])

  return (
    <>
      <Container ref={ref} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

export default MapComponent
