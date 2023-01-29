import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import ShortBlock from "features/LeftContainer/ShortBlock"
import StoreList from "features/StoreList"
import Head from "next/head"
import styled, { css } from "styled-components"
import { labelStyles } from "features/GoogleMap/labelStyles"
import useRWD from "hooks/useRWD"
import LandingSearch from "features/LandingSearch"
import { useRouter } from "next/router"
import StoreDetail from "features/StoreDetail"
import useSWR from "swr"

export default function MobileMapPage() {
  useRWD({ redirect: true })
  const router = useRouter()
  const { asPath } = router
  const match = asPath.match(/\/map\/place\/([^\/]+)/)
  const placeId = match && match[1]
  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null)

  if (!router.isReady) return <div>Loading...</div>

  const showMap = asPath.startsWith("/m/map/@")

  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <FullScreenOverlay lock={showMap}>
        <AppBar />
        {asPath === "/m/map" && <LandingSearch />}
        {asPath.startsWith("/m/map/place/") && <StoreDetail store={store} />}
        <MapArea hide={!showMap}>
          {showMap && <ShortBlock />}
          <GoogleMap>
            <MyLocationMarker />
            <StoreMarkers />
          </GoogleMap>
        </MapArea>
        {showMap && <StoreList />}
      </FullScreenOverlay>
    </>
  )
}

const FullScreenOverlay = styled.div`
  ${({ lock}) => lock && css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  `}
`

const MapArea = styled.div`
  ${({ hide }) => hide && `z-index: -1;`}
  position: relative;
  width: 100%;
  height: 100%;

  ${labelStyles}
`
