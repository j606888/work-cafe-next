import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import LandingSearch from "features/LandingSearch"
import LeftContainer from "features/LeftContainer"
import StoreDetail from "features/StoreDetail"
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
        <MapArea>
          {panelType === "INIT" && <LandingSearch />}
          {panelType === "STORE_LIST" && <LeftContainer />}
          {panelType === "STORE_DETAIL" && <StoreDetail />}
          {/* {panelType === 'STORE_DETAIL'&& <StoreDetail key={placeId} />} */}
          <GoogleMap>
            <StoreMarkers />
            <MyLocationMarker />
          </GoogleMap>
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
  height: calc(100vh - 120px); // If using 100vh, when stores exist will overflow.
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`
