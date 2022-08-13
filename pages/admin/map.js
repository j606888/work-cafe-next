import React, { useState } from "react"
import AdminLayout from "src/components/AdminLayout"
import GoogleMapWrapper from "@/components/GoogleMapWrapper"

const MapPage = () => {
  const [map, setMap] = useState(null)

  return (
    <AdminLayout>
      <GoogleMapWrapper map={map} setMap={setMap}>
      </GoogleMapWrapper>
    </AdminLayout>
  )
}

export default MapPage
