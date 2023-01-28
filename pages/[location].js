import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import LeftContainer from "features/LeftContainer"
import ShowLabelCheckbox from "features/GoogleMap/ShowLabelCheckbox"
import Head from "next/head"
import styled from "styled-components"
import SearchHere from "components/Button/SearchHere"
import { labelStyles } from "features/GoogleMap/labelStyles"
import useRWD from "hooks/useRWD"

export default function MapPage() {
  useRWD()

  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <Container>
        <AppBar />
        <MapArea>
          <ShowLabelCheckbox />
          <LeftContainer />
          <GoogleMap>
            <StoreMarkers />
            <MyLocationMarker />
            <SearchHereButton />
          </GoogleMap>
        </MapArea>
      </Container>
    </>
  )
}

const SearchHereButton = styled(SearchHere)`
  position: absolute;
  left: 50%;
  top: 32px;
  transform: translateX(-50%);
  z-index: 2;

`
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MapArea = styled.div`
  position: relative;
  // If using 100vh, when stores exist will overflow.
  height: calc(100vh - 120px);
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  ${labelStyles}
`
