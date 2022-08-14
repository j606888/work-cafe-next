import { useEffect, useState } from "react"
import AdminLayout from "src/components/AdminLayout"
import GoogleMapWrapper from "@/components/GoogleMapWrapper"
import Marker from "@/components/GoogleMapWrapper/Marker"
import { getStoresByLocation } from "@/api/index"
import Router, { useRouter } from "next/router"
import { Box, Button } from "@mui/material"

const DEFAULT_CENTER = {
  lat: 23.003043,
  lng: 120.216569,
}

// TODO, Show store_list beside
// TODO, Blacklist Tab

const MapPage = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()

  async function callAPI() {
    const params = center ? center : DEFAULT_CENTER
    const res = await getStoresByLocation(params)
    setStores(res)
    setShowButton(false)
  }

  useEffect(() => {
    if (router.isReady) {
      const regexp = /@(?<lat>.*),(?<lng>.*),(?<zoom>.*)z/
      const match = regexp.exec(router.asPath)

      if (match) setCenter(match.groups)
    }
  }, [router.isReady])

  function handleOnIdle(m) {
    if (!m.getCenter()) return

    const { lat, lng } = m.getCenter().toJSON()
    const mapCenter = {
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
      zoom: m.getZoom(),
    }
    Router.push({
      pathname: `@${mapCenter.lat},${mapCenter.lng},${mapCenter.zoom}z`,
    })
    setCenter(mapCenter)
    setShowButton(true)
  }

  const handleMarkerClick = (placeId) => {
    // Router.push(`/admin/stores/${placeId}`)
    const origin = window.location.origin
    const path = `/admin/stores/${placeId}`
    
    window.open(`${origin}${path}`, '_blank')
  }

  const handleMarkerOver = (id) => {
    console.log(`id ${id} was hovered`)
  }

  const handleMarkerOut = (id) => {
    console.log(`id ${id} was out`)
  }

  const markers = stores.map((store) => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      },
    }
    return (
      <Marker
        options={options}
        key={store.id}
        id={store.id}
        store={store}
        onClick={handleMarkerClick}
        onMouseover={handleMarkerOver}
        onMouseout={handleMarkerOut}
      />
    )
  })

  const buttonStyle = {
    position: "absolute",
    top: "8%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    display: showButton ? "block" : "none",
  }

  return (
    <AdminLayout>
      <Box sx={{ position: "relative" }}>
        <Button variant="contained" sx={buttonStyle} onClick={callAPI}>
          Search Here
        </Button>
        {router.isReady && (
          <GoogleMapWrapper
            map={map}
            setMap={setMap}
            onIdle={handleOnIdle}
            initCenter={{ lat: center.lat, lng: center.lng }}
            initZoom={center.zoom}
          >
            {markers}
          </GoogleMapWrapper>
        )}
      </Box>
    </AdminLayout>
  )
}

export default MapPage
