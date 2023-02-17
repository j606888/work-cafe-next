import { devices } from "constants/styled-theme"
import GoogleMap from "features/GoogleMap"
import Header from "features/Header"
import styled from "styled-components"
import SearchHere from "components/Button/SearchHere"
import SearchStores from "features/SearchStores"
import StoreList from "features/StoreList"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import StoreMarker from "features/GoogleMap/StoreMarker"
import ShowLabelCheckbox from "features/GoogleMap/ShowLabelCheckbox"
import { useRouter } from "next/router"
import LandingSearch from "features/LandingSearch"
import useSWR from "swr"
import StoreDetail from "features/StoreDetail"
import { labelStyles } from "features/GoogleMap/labelStyles"
import Skeleton from "components/Skeleton"
import Head from "next/head"
import GlobalSnackbar from "features/GlobalSnackbar"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import MyPosition from "features/MyPosition"
import { useEffect } from "react"

const pickContent = ({ isLanding, store, storeLoading }) => {
  if (isLanding) return null
  if (storeLoading)
    return (
      <StoreDetailContainer>
        <Skeleton />
      </StoreDetailContainer>
    )
  if (store)
    return (
      <StoreDetailContainer>
        <StoreDetail store={store} />
      </StoreDetailContainer>
    )
  return (
    <>
      <SearchStores />
      <ContentContainer>
        <StoreList />
      </ContentContainer>
    </>
  )
}

const ContentOnMap = ({ isLanding }) => {
  return isLanding ? (
    <LandingSearch />
  ) : (
    <>
      <SearchHere />
      <ShowLabelCheckbox />
    </>
  )
}

export default function MapPage() {
  const { asPath, isReady } = useRouter()
  const isLanding = asPath === "/map"
  const match = asPath.match(/\/map\/place\/([^\/]+)/)
  const placeId = match && match[1]
  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null)
  const storeLoading = placeId && !store
  let title = "Work Cafe | Taiwan"
  if (store) title = `${store.name} - ${title}`

  useEffect(() => {
    let title = "Work Cafe | Taiwan"
    if (store) title = `${store.name} - ${title}`

    document.title = title
  }, [store])

  if (!isReady) return null

  const content = pickContent({ store, isLanding, storeLoading })

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/cafe-orange.svg" type="image/svg" />
        <meta name="description" content="Work Cafe - Taiwan" />
      </Head>
      <Header />
      <Container>
        {content}
        <MapContainer isLanding={isLanding}>
          <ContentOnMap isLanding={isLanding} />
          <GoogleMap>
            {!isLanding && <StoreMarkers />}
            {!isLanding && <MyLocationMarker />}
            {!isLanding && <MyPosition />}
            {store && <StoreMarker store={store} isFocus />}
          </GoogleMap>
        </MapContainer>
      </Container>
      <GlobalSnackbar />
    </>
  )
}

const Container = styled.div`
  display: flex;
`

const StoreDetailContainer = styled.div`
  width: 628px;
  /* 80px: MainHeader, 40px: HelpUs, 112px: SearchStores */
  height: calc(100% - 80px - 40px);
  position: fixed;
  left: 0;
  top: calc(80px + 40px);
  bottom: 0;
  overflow-y: auto;

  @media ${devices.mobileXl} {
    width: 100%;
    top: 56px;
    height: calc(100% - 56px);
    z-index: 2;
  }
`

const ContentContainer = styled.div`
  width: 628px;
  /* 80px: MainHeader, 40px: HelpUs, 112px: SearchStores */
  height: calc(100% - 80px - 40px - 112px);
  position: fixed;
  left: 0;
  top: calc(80px + 40px + 112px);
  bottom: 0;
  overflow-y: auto;

  @media ${devices.mobileXl} {
    width: 100%;
    height: 248px;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    overflow-x: auto;
    display: flex;
  }
`

const MapContainer = styled.div`
  width: ${({ isLanding }) => (isLanding ? "100%" : "calc(100% - 628px)")};
  height: calc(100% - 80px - 40px);
  position: fixed;
  top: calc(80px + 40px);
  right: 0;
  bottom: 0;
  ${labelStyles};

  @media ${devices.mobileXl} {
    position: fixed;
    width: 100%;
    height: ${({ isLanding }) =>
      isLanding ? "calc(100% - 56px)" : "calc(100% - 56px - 248px)"};
    top: 56px;
  }
`
