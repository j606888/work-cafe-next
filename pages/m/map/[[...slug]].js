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
import SvgButton from "components/SvgButton"
import useSWR from "swr"
import { devices } from "constants/styled-theme"
import { useState } from "react"
import { grey01 } from "constants/color"
import SearchHere from "components/Button/SearchHere"

export default function MobileMapPage() {
  useRWD({ redirect: true })
  const router = useRouter()
  const { asPath } = router
  const match = asPath.match(/\/map\/place\/([^\/]+)/)
  const placeId = match && match[1]
  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null)
  const [expand, setExpand] = useState(false)

  if (!router.isReady) return <div>Loading...</div>

  const showMap = asPath.startsWith("/m/map/@")

  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <FullScreenOverlay lock={showMap && !expand}>
        <AppBar />
        {asPath === "/m/map" && <LandingSearch />}
        {asPath.startsWith("/m/map/place/") && <StoreDetail store={store} />}
        <MapArea hide={!showMap}>
          {showMap && <ShortBlock />}
          <GoogleMap>
            <MyLocationMarker />
            <StoreMarkers />
            <SearchHereButton />
          </GoogleMap>
        </MapArea>
        {showMap && <>
          <StoreList expand={expand} />
        {!expand && (
          <ExpandButton onClick={() => setExpand(true)}>
            <SvgButton path="expand-btn" />
          </ExpandButton>
        )}
        {expand && <ShowMapButton onClick={() => setExpand(false)}>
          <img src="/arrow-down.svg" alt="arrow-down" />
            <span>顯示地圖</span>
          </ShowMapButton>}
        </>}
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

const SearchHereButton = styled(SearchHere)`
  position: absolute;
  left: 50%;
  top: 72px;
  transform: translateX(-50%);
  z-index: 2;
`

const ShowMapButton = styled.div`
  width: 120px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${grey01};
  color: #FFFFFF;
  gap: 4px;
  border-radius: 12px;
  position: fixed;
  bottom: 31px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
`

const ExpandButton = styled.div`
  width: 32px;
  height: 60px;
  background-color: #ffffff;
  z-index: 15;
  position: fixed;
  bottom: calc((100vh - 120px) / 2);
  left: 628px;
  transform: translateY(50%);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media ${devices.mobileXl} {
    left: 50%;
    bottom: 217px;
    transform: translateX(-50%) rotate(-90deg);
    z-index: 10;
  }
`
