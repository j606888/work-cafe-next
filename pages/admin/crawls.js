import React from 'react'
import { Wrapper } from "@googlemaps/react-wrapper"
import MapComponent from 'components/MapComponent'
import AdminLayout from "components/AdminLayout"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

const Map = () => {
  return (
    <AdminLayout>
      <Wrapper apiKey={API_KEY}>
        <MapComponent />
      </Wrapper>
    </AdminLayout>
  )
}

export default Map
