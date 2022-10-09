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

const MapV2 = () => {
  const { isReady, mapSettings } = useInitMap()
  const { handleLoad, handleIdle, moveTo, center, updateWithPlaceId } = useControlMap()
  const searchHere = useLocationParamsStore((state) => state.searchHere)
  const [myLocation, setMyLocation] = useState(null)
  const stores = useStoreStore((state) => state.stores)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const placeId = useStoreStore((state) => state.placeId)
  const bouncePlaceId = useStoreStore((state) => state.bouncePlaceId)
  const [showLabel, setShowLabel] = useState(true)

  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null)

  function handleClickMarker(placeId) {
    setPlaceId(placeId)
    updateWithPlaceId(placeId)
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

  if (!isReady) return <Skeleton />

  return (
    <Container>
      <MyLocationContainer>
        <MyLocation onClick={handleFindMe} />
      </MyLocationContainer>
      <SearchHereContainer>
        <SearchHere onClick={handleSearchHere} />
      </SearchHereContainer>
      <ShowLabelCheckbox onChange={handleToggle} />
      <GoogleMap
        onLoad={handleLoad}
        onIdle={handleIdle}
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
        {stores.map((store) => (
          <StoreMarker
            key={store.placeId}
            store={store}
            showLabel={showLabel}
            isFocus={store.placeId === placeId}
            isBounce={store.placeId === bouncePlaceId}
            onClick={handleClickMarker}
          />
        ))}
        {stores.length === 0 && store && (
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
