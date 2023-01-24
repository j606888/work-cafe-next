import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import LandingSearch from "features/LandingSearch"
import LeftContainer from "features/LeftContainer"
import Head from "next/head"
import store from "stores/store"
import styled from "styled-components"

export default function MapPage() {
  const { panelType } = store((state) => ({
    panelType: state.panelType,
  }))

  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <Container>
        <AppBar />
        {/* TODO, Should replace StoreMap */}
        <MapArea>
          <GoogleMap>
            <StoreMarkers />
            <MyLocationMarker />
          </GoogleMap>
          {panelType === "INIT" && <LandingSearch />}
          {panelType === "STORE_LIST" && <LeftContainer />}
        </MapArea>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MapArea = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`
