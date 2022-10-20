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
import { Container, MyLocationContainer, SearchHereContainer } from "./styled"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import useMapStoreV2 from "stores/useMapStoreV2"
import { useMediaQuery } from "@mui/material"
import useUserStore from "stores/useUserStore"
import useStoreSWR from "stores/useStoreSWR"

const MapV2 = () => {
  const { isReady, mapSettings } = useInitMap()
  const { handleLoad, handleIdle, moveTo, center, updateWithPlaceId } = useControlMap({ navigate: true })
  const searchHere = useLocationParamsStore((state) => state.searchHere)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const placeId = useStoreStore((state) => state.placeId)
  const focusPlaceId = useStoreStore((state) => state.focusPlaceId)
  const setFocusPlaceId = useStoreStore((state) => state.setFocusPlaceId)
  const bouncePlaceId = useStoreStore((state) => state.bouncePlaceId)
  const [showLabel, setShowLabel] = useState(true)
  const myLocation = useMapStoreV2(state => state.myLocation)
  const setMyLocation = useMapStoreV2(state => state.setMyLocation)
  const fullScreen = useMediaQuery('(max-width:390px)');
  const map = useMapStoreV2(state => state.map)
  const isLogin = useUserStore(state => state.isLogin)

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

  function handleToggle(checked) {
    setShowLabel(checked)
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

  if (!isReady) return <Skeleton />

  return (
    <Container>
      <MyLocationContainer>
        <MyLocation onClick={handleFindMe} />
      </MyLocationContainer>
      <SearchHereContainer>
        <SearchHere onClick={handleSearchHere} loading={isLoading} />
      </SearchHereContainer>
      <ShowLabelCheckbox onChange={handleToggle} />
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
            isFocus={store.placeId === placeId || store.placeId === focusPlaceId}
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
        {(!stores || stores?.length === 0 )&& store && (
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
