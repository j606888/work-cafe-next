import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import AppBar from "features/AppBar"
import StoreDetail from "features/StoreDetail"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import Head from "next/head"
import styled from "styled-components"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import GoogleMap from "features/GoogleMap"
import SearchHere from "components/Button/SearchHere"
import camelcaseKeys from "camelcase-keys"

const API_HOST = process.env.NEXT_PUBLIC_API_HOST

function camelcase(store) {
  return camelcaseKeys(store, { deep: true })
}

export async function getServerSideProps({ params }) {
  const placeId = params.placeId
  const res = await fetch(`${API_HOST}/stores/${placeId}`)
  const store = await res.json()

  return { props: { store: camelcase(store) } }
}

export default function PlacePage({ store }) {
  const fullScreen = useMediaQuery(devices.mobileXl)

  if (fullScreen) {
    return (
      <>
        <Head>
          <title>{store.name}</title>
        </Head>
        <AppBar />
        <StoreDetail store={store} />
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>{store.name}</title>
        </Head>
        <Container>
          <AppBar />
          <MapArea>
            <StoreDetail store={store} />
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
}

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

  .labels {
    font-size: 14px;
    font-weight: 700;
    color: #222120;
    box-sizing: border-box;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px;
  }

  .right {
    bottom: 2.9rem;
    left: 0.9rem;
  }

  .left {
    bottom: 2.9rem;
    right: 1rem;
  }

  .top {
    bottom: 4.3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .bottom {
    top: 3.8rem;
    left: 50%;
    transform: translateX(-50%);
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
const SearchHereButton = styled(SearchHere)`
  position: absolute;
  left: 50%;
  top: 32px;
  transform: translateX(-50%);
  z-index: 2;
`
