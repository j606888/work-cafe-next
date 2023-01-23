import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import LandingSearch from "features/LandingSearch"
import Head from "next/head"
import styled from "styled-components"

export default function MapPage() {
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
            <MyLocationMarker />
          </GoogleMap>
          <LandingSearch />
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
  height: 100%;
  width: 100%;
`
