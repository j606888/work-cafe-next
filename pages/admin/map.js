import { useEffect, useState } from "react"
import AdminLayout from "src/components/AdminLayout"
import GoogleMapWrapper from "@/components/GoogleMapWrapper"
import Marker from "@/components/GoogleMapWrapper/Marker"
import { getStoresByLocation } from "@/api/index"
import Router from "next/router"
import { Box, Button } from "@mui/material"

const DEFAULT_CENTER = {
  lat: 23.003043,
  lng: 120.216569,
}

const MapPage = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])
  const [center, setCenter] = useState(null)
  const [showButton, setShowButton] = useState(false)

  async function callAPI() {
    const params = center ? center : DEFAULT_CENTER
    const res = await getStoresByLocation(params)
    setStores(res)
    setShowButton(false)
  }

  useEffect(() => {
    callAPI()
  }, [])

  function handleOnIdle(m) {
    if (!m.getCenter()) return

    const { lat, lng } = m.getCenter().toJSON()
    const mapCenter = {
      lat: +lat.toFixed(6),
      lng: +lng.toFixed(6),
      zoom: m.getZoom(),
    }
    Router.push({ query: mapCenter })
    setCenter(mapCenter)
    setShowButton(true)
  }

  const markers = stores.map(store => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      }
    }
    return <Marker options={options} key={store.id} />
  })

  const buttonStyle = {
    position: "absolute",
    top: "8%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    display: showButton ? 'block' : 'none',
  }

  return (
    <AdminLayout>
      <Box sx={{ position: 'relative' }}>
        <Button variant="contained" sx={buttonStyle} onClick={callAPI}>
          Search Here
        </Button>
        <GoogleMapWrapper map={map} setMap={setMap} onIdle={handleOnIdle}>
          {markers}
        </GoogleMapWrapper>
      </Box>
    </AdminLayout>
  )
}

export default MapPage
