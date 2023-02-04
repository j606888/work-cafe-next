import { devices } from "constants/styled-theme"
import GoogleMap from "features/GoogleMap"
import Header from "features/v2/Header"
import styled from "styled-components"
import SearchHere from "components/Button/SearchHere"
import SearchStores from "features/v2/SearchStores"
import StoreList from "features/StoreList"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import ShowLabelCheckbox from "features/GoogleMap/ShowLabelCheckbox"
import { useRouter } from "next/router"
import LandingSearch from "features/LandingSearch"

export default function NewMap() {
  const { asPath, isReady } = useRouter()
  const isLanding = asPath === "/new-map"

  if (!isReady) return <div>loading...</div>

  return (
    <>
      <Header />
      <Container>
        {!isLanding && (
          <>
            <SearchStores />
            <ContentContainer>
              <StoreList />
            </ContentContainer>
          </>
        )}
        <MapContainer isLanding={isLanding}>
          {isLanding && <LandingSearch />}
          {!isLanding && (
            <>
              <SearchHere />
              <ShowLabelCheckbox />
            </>
          )}
          <GoogleMap>
            <StoreMarkers />
          </GoogleMap>
        </MapContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
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

  @media ${devices.mobileXl} {
    position: fixed;
    width: 100%;
    height: ${({ isLanding }) =>
      isLanding ? "calc(100% - 56px)" : "calc(100% - 56px - 248px)"};
    top: 56px;
  }
`
