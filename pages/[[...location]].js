import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import LandingSearch from "features/LandingSearch"
import LeftContainer from "features/LeftContainer"
import StoreDetail from "features/StoreDetail"
import Head from "next/head"
import store from "stores/store"
import styled, { css } from "styled-components"

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
            {panelType !== "INIT" && <StoreMarkers />}
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

const label = css`
  font-size: 14px;
  font-weight: 700;
  color: #222120;
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
`

const MapArea = styled.div`
  position: relative;
  // If using 100vh, when stores exist will overflow.
  height: calc(100vh - 120px);
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  .labels-right {
    ${label}
    bottom: 2.9rem;
    left: 0.9rem;
  }

  .labels-left {
    ${label}
    bottom: 2.9rem;
    right: 1rem;
  }

  .labels-focus {
    background-color: white;
    border-radius: 28px;
    border: 2px solid #ffa233;
    color: #222120;
    font-size: 14px;
    font-weight: 700;
    padding: 6px 12px;
    box-sizing: border-box;
    position: absolute;
    bottom: 2.3rem;
    left: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px;
  }
`
