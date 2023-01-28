import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import ShortBlock from "features/LeftContainer/ShortBlock"
import StoreList from "features/StoreList"
import Head from "next/head"
import styled from "styled-components"
import { labelStyles } from "features/GoogleMap/labelStyles"
import useRWD from "hooks/useRWD"

export default function MobileLocationPage() {
  useRWD(true)

  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <FullScreenOverlay>
        <AppBar />
        <MapArea>
          <ShortBlock />
          <GoogleMap>
            <MyLocationMarker />
            <StoreMarkers />
          </GoogleMap>
        </MapArea>
        <StoreList />
      </FullScreenOverlay>
    </>
  )
}

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`

const MapArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  ${labelStyles}
`
