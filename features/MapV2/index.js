import { Marker } from "@react-google-maps/api"
import SearchHere from "components/Button/SearchHere"
import Skeleton from "components/Skeleton"
import GoogleMap from "features/GoogleMap"
import StoreMarker from "features/GoogleMap/StoreMarker"
import MyLocation from "features/MyLocation"
import useInitMap from "hooks/useInitMap"
import useStoreStore from "stores/useStoreStore"
import { useState } from "react"
import useSWR from "swr"
import ShowLabelCheckbox from "./ShowLabelCheckbox"
import styled from "styled-components"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import useMapStoreV2 from "stores/useMapStoreV2"
import { useMediaQuery } from "@mui/material"
import useUserStore from "stores/useUserStore"
import useMapControl from "stores/useMapControl"
import useStoreSWR from "stores/useStoreSWR"
import { devices } from 'constant/styled-theme'
import shallow from "zustand/shallow"

const MapV2 = ({ navigate = true}) => {
  const { isReady, mapSettings } = useInitMap()
  const { width } = useMapControl()
  const { handleLoad, handleIdle, moveTo, center, updateWithPlaceId } =
    useControlMap({ navigate })
  const searchHere = useLocationParamsStore((state) => state.searchHere)
  const [setPlaceId, placeId, focusPlaceId, setFocusPlaceId, bouncePlaceId] =
    useStoreStore(
      (state) => [
        state.setPlaceId,
        state.placeId,
        state.focusPlaceId,
        state.setFocusPlaceId,
        state.bouncePlaceId,
      ],
      shallow
    )
  const [showLabel, setShowLabel] = useState(true)
  const myLocation = useMapStoreV2((state) => state.myLocation)
  const setMyLocation = useMapStoreV2((state) => state.setMyLocation)
  const map = useMapStoreV2((state) => state.map)
  const fullScreen = useMediaQuery(devices.mobileXl)
  const isLogin = useUserStore((state) => state.isLogin)

  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null)
  const { data: bookmarkStores } = useSWR(isLogin ? `/user-bookmarks` : null)
  const { data: stores, isLoading } = useStoreSWR()

  function handleClickMarker(placeId) {
    if (fullScreen) {
      setFocusPlaceId(placeId)
    } else {
      setPlaceId(placeId)
      updateWithPlaceId(placeId)
    }
  }

  function handleSearchHere() {
    searchHere(center)
    setPlaceId(null)
  }

  function handleFindMe(latLng) {
    moveTo({ latLng })
    setMyLocation(latLng)
  }

  function handleOnIdle() {
    handleIdle()
    const shouldShow = map?.zoom >= 16
    if (fullScreen) {
      setShowLabel(shouldShow)
    }
  }

  // Weird iOS bug, if map exist, will scroll to top
  // if (fullScreen && placeId) return null
  if (!isReady) return <Skeleton />

  return (
    <Container width={width}>
      {/* <MyLocationContainer>
        <MyLocation onClick={handleFindMe} />
      </MyLocationContainer> */}
      {/* <SearchHereContainer>
        <SearchHere onClick={handleSearchHere} loading={isLoading} />
      </SearchHereContainer> */}
      {/* <ShowLabelCheckbox onChange={(checked) => setShowLabel(checked)} /> */}
      <GoogleMap
        onLoad={handleLoad}
        onIdle={handleOnIdle}
        mapSettings={mapSettings}
      >
        {myLocation && (
          <Marker
            position={myLocation}
            icon={{
              url: "/me.svg",
              scaledSize: new google.maps.Size(22, 22),
            }}
          />
        )}
        {stores?.map((store) => (
          <StoreMarker
            key={store.placeId}
            store={store}
            isBookmark={store.bookmark}
            showLabel={showLabel}
            isFocus={
              store.placeId === placeId || store.placeId === focusPlaceId
            }
            isBounce={store.placeId === bouncePlaceId}
            onClick={handleClickMarker}
          />
        ))}
        {bookmarkStores?.map((store) => (
          <StoreMarker
            key={store.placeId}
            isBookmark
            store={store}
            showLabel={showLabel}
            onClick={handleClickMarker}
          />
        ))}
        {(!stores || stores?.length === 0) && store && (
          <StoreMarker
            key={store.placeId}
            store={store}
            showLabel={showLabel}
            isFocus
          />
        )}
      </GoogleMap>
    </Container>
  )
}

export default MapV2

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 120px;
  /* width: calc(100% - 628px); */
  /* width: 100%; */
  width: ${({ width }) => width };
  height: calc(100vh - 104px);

  .labels {
    background-color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 12px;
    padding: 4px 8px;
    border: 1px solid #999;
    box-sizing: border-box;
    position: absolute;
    bottom: 2.3rem;
    left: 0.8rem;
    overflow: hidden;
    max-width: 240px;
  }

  @media ${devices.mobileXl} {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    height: auto;
  }
`

const MyLocationContainer = styled.div`
  position: absolute;
  bottom: 7rem;
  right: 0.7rem;
  z-index: 2;

  @media ${devices.mobileXl} {
    top: calc(56px + 72px + 1rem);
    right: 1rem;
  }
`

const SearchHereContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 1rem;
  transform: translateX(-50%);
  z-index: 2;

  @media ${devices.mobileXl} {
    top: calc(56px + 72px + 1rem);
    left: 1rem;
    transform: none;
    z-index: 2000;
  }
`
