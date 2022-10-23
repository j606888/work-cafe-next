import Skeleton from "components/Skeleton"
import GoogleMap from "features/GoogleMap"
import { MyLocationContainer } from "features/MapV2/styled"
import MyLocation from "features/MyLocation"
import useControlMap from "hooks/useControlMap"
import useInitMap from "hooks/useInitMap"
import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import StoreMarker from "features/GoogleMap/StoreMarker"
import useStoreStore from "stores/useStoreStore"
import useSWR from "swr"
import { useMediaQuery } from "@mui/material"
import shallow from "zustand/shallow"

const BookmarkMap = () => {
  const { isReady, mapSettings } = useInitMap()
  const { handleLoad, moveTo, updateWithPlaceId } = useControlMap({
    navigate: false,
  })
  const { data: bookmarkStores } = useSWR("/user-bookmarks")
  const fullScreen = useMediaQuery(devices.mobileXl)
  const [setPlaceId, setFocusPlaceId] = useStoreStore(
    (state) => [state.setPlaceId, state.setFocusPlaceId],
    shallow
  )

  function handleFindMe(latLng) {
    moveTo({ latLng })
  }

  function handleClickMarker(placeId) {
    if (fullScreen) {
      setFocusPlaceId(placeId)
    } else {
      setPlaceId(placeId)
      updateWithPlaceId(placeId, false)
    }
  }

  if (!isReady) return <Skeleton />

  return (
    <Container>
      <MyLocationContainer>
        <MyLocation onClick={handleFindMe} />
      </MyLocationContainer>
      <GoogleMap onLoad={handleLoad} mapSettings={mapSettings}>
        {bookmarkStores?.map((store) => (
          <StoreMarker
            key={store.placeId}
            isBookmark
            store={store}
            showLabel
            onClick={handleClickMarker}
          />
        ))}
      </GoogleMap>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 104px;
  width: calc(100% - 628px);
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

export default BookmarkMap
