import React, { useState } from 'react'
import { Wrapper } from "@googlemaps/react-wrapper"
import MapComponent from './MapComponent'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

const GoogleMap = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])

  return (
    <Wrapper apiKey={API_KEY}>
      <MapComponent map={map} setMap={setMap}></MapComponent>
    </Wrapper>
  )
}

export default GoogleMap
