import React, { useEffect, useState } from "react"
import AdminLayout from "src/components/AdminLayout"
import GoogleMapWrapper from "@/components/GoogleMapWrapper"
import Marker from "@/components/GoogleMapWrapper/Marker"
import { getStoresByLocation } from "@/api/index"

const MapPage = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])

  useEffect(() => {
    async function callAPI() {
      const res = await getStoresByLocation({
        lat: 23.003043,
        lng: 120.216569
      })
      setStores(res)
    }

    callAPI()
  }, [])

  const markers = stores.map(store => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      }
    }
    return <Marker options={options} key={store.id} />
  })

  // const marker = <Marker options={options} />

  return (
    <AdminLayout>
      <GoogleMapWrapper map={map} setMap={setMap}>
        {/* {marker} */}
        {markers}
      </GoogleMapWrapper>
    </AdminLayout>
  )
}

export default MapPage
