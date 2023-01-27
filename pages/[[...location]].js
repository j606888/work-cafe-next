import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import LandingSearch from "features/LandingSearch"
import LeftContainer from "features/LeftContainer"
import StoreDetail from "features/StoreDetail"
import ShowLabelCheckbox from "features/GoogleMap/ShowLabelCheckbox"
import Head from "next/head"
import store, { PANEL_TYPES } from "stores/store"
import styled from "styled-components"
import SearchHere from "components/Button/SearchHere"
import { devices } from "constants/styled-theme"

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
        <MapArea panelType={panelType}>
          {panelType !== PANEL_TYPES.INIT && <ShowLabelCheckbox />}
          {panelType === PANEL_TYPES.INIT && <LandingSearch />}
          {panelType === PANEL_TYPES.STORE_LIST && <LeftContainer />}
          {panelType === PANEL_TYPES.STORE_DETAIL && <StoreDetail />}
          <GoogleMap>
            {panelType !== PANEL_TYPES.INIT && <StoreMarkers />}
            <MyLocationMarker />
            <SearchHereButton panelType={panelType} />
          </GoogleMap>
        </MapArea>
      </Container>
    </>
  )
}

const SearchHereButton = styled(SearchHere)`
  position: absolute;
  left: ${({ panelType }) => panelType === PANEL_TYPES.INIT ? "calc(50% + 312px)" : "50%"};
  top: 32px;
  transform: translateX(-50%);
  z-index: 2;

  @media ${devices.mobileXl} {
    display: none;
  }
`
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media ${devices.mobileXl} {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
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

  @media ${devices.mobileXl} {
    /* height: ${({ panelType }) =>
       panelType === PANEL_TYPES.STORE_LIST ? "calc(100% - 40px - 240px)" : "calc(100% - 56px)"}; */
    height: 100%;
    overflow: scroll;
  }
`
