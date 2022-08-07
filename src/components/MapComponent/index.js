import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useGoogleMap from '@/hooks/useGoogleMap'
import useGoogleMarker from '@/hooks/useGoogleMarker'

const Container = styled.div`
  height: calc(100vh - 64px - 3rem);
  width: 100%;
`

const options = {
  position: {
    lat: 22.9976545,
    lng: 120.2117627,
  },
  label: "Cool",
}

const MapComponent = () => {
  const ref = useRef(null)
  const map = useGoogleMap({ ref })
  useGoogleMarker({map, options})

  

  return <Container ref={ref} />
}

export default MapComponent
