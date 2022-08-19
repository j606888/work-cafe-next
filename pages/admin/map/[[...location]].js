import { useEffect, useState } from "react"
import AdminLayout from "components/AdminLayout"
import GoogleMapWrapper from "components/GoogleMapWrapper"
import Marker from "components/GoogleMapWrapper/Marker"
import { getStoresByLocation } from "api/stores"
import Router, { useRouter } from "next/router"
import { Box, Button } from "@mui/material"
import styled from "styled-components"
import StoreSideList from "components/StoreSideList"

const Container = styled.div`
  display: flex;
`

const DEFAULT_CENTER = {
  lat: 23.003043,
  lng: 120.216569,
}

const MapPage = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const [showButton, setShowButton] = useState(false)
  const [bouncingId, setBouncingId] = useState(null)
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
    const origin = window.location.origin
    const path = `/admin/stores/${placeId}`
    window.open(`${origin}${path}`, "_blank")
  }

  const handleMarkerOver = (id) => {
    // console.log(`id ${id} was hovered`)
  }

  const handleMarkerOut = (id) => {
    // console.log(`id ${id} was out`)
  }

  const markers = stores.map((store) => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      },
    }

    if (store.id === bouncingId) {
      options.animation = google.maps.Animation.BOUNCE
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

  function handleMouseEnter(id) {
    setBouncingId(id)
  }

  function handleMouseLeave(id) {
    setBouncingId(null)
  }

  return (
    <AdminLayout>
      <Container>
        <Box sx={{ height: "90vh" }}>
          <StoreSideList
            stores={stores}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Box>
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
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
      </Container>
    </AdminLayout>
  )
}

export default MapPage
