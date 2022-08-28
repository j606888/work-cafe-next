import React from "react"
import styled from "styled-components"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import { getStoresByLocation } from "api/stores"
import Router, { useRouter } from "next/router"
import { Box, Button } from "@mui/material"
import StoreSideList from "components/StoreSideList"
import { useEffect, useState } from "react"
import { useRef } from "react"

const Container = styled.div`
  position: relative;
`

const DEFAULT_CENTER = {
  lat: 23.003043,
  lng: 120.216569,
}

const AdminStoreMap = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])
  const centerRef = useRef(DEFAULT_CENTER)
  const [showButton, setShowButton] = useState(false)
  const [bouncingId, setBouncingId] = useState(null)
  const router = useRouter()

  async function callAPI() {
    const params = centerRef.current
    const res = await getStoresByLocation(params)
    setStores(res)
    setShowButton(false)
  }

  useEffect(() => {
    if (router.isReady) {
      const regexp = /@(?<lat>.*),(?<lng>.*),(?<zoom>.*)z/
      const match = regexp.exec(router.asPath)

      if (match) centerRef.current = match.groups
    }
  }, [router])

  function handleOnIdle({ lat, lng, zoom }) {
    Router.push({
      pathname: `@${lat},${lng},${zoom}z`,
    })
    centerRef.current = { lat, lng, zoom }
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
    top: "5%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  }

  function handleMouseEnter(id) {
    setBouncingId(id)
  }

  function handleMouseLeave(id) {
    setBouncingId(null)
  }

  return (
    <Container>
      <Box sx={{ position: 'absolute', left: 0, top: 0, zIndex: 100000 }}>
        <StoreSideList
          stores={stores}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Box>
      
        <Button variant="contained" sx={buttonStyle} onClick={callAPI}>
          Search Here
        </Button>
        {/* {router.isReady && ( */}
          <GoogleMapWrapper
            map={map}
            setMap={setMap}
            marginTop="120px"
            onIdle={handleOnIdle}
            // initCenter={{ lat: center.lat, lng: center.lng }}
            // initZoom={center.zoom}
          >
            {markers}
          </GoogleMapWrapper>
        {/* )} */}
    </Container>
  )
}

export default AdminStoreMap
