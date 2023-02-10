import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import useSearchStores from "hooks/useSearchStores"
import useUpdateURL from "hooks/useUpdateURL"
import React from "react"
import storeStore from "stores/store"
import StoreMarker from "./StoreMarker"

const StoreMarkers = ({ store }) => {
  const { setCenterWithPlaceIdToURL } = useUpdateURL()
  const { data: stores } = useSearchStores()
  const {
    placeId,
    setPlaceId,
    focusPlaceId,
    bouncePlaceId,
    setFocusPlaceId,
    map,
    showLabel,
  } = storeStore((state) => ({
    placeId: state.placeId,
    setPlaceId: state.setPlaceId,
    focusPlaceId: state.focusPlaceId,
    bouncePlaceId: state.bouncePlaceId,
    setFocusPlaceId: state.setFocusPlaceId,
    map: state.map,
    showLabel: state.showLabel,
  }))
  const fullScreen = useMediaQuery(devices.mobileXl)
  const showLabel2 =
    (!fullScreen && showLabel) || (fullScreen && map?.zoom >= 15)

  function handleClickMarker(placeId) {
    if (fullScreen) {
      setFocusPlaceId(placeId)
    } else {
      setPlaceId(placeId)
      setFocusPlaceId(placeId)
      setCenterWithPlaceIdToURL(placeId)
    }
  }

  if (!stores || !map) return null

  let storeList = stores.stores
  if (store && !storeList.map(store => store.placeId).includes(store.placeId)) storeList = [...storeList, store]

  const mapLng = map.center.lng()
  const mapLat = map.center.lat()

  return (
    <>
      {storeList.map((store) => {
        return (
          <StoreMarker
            mapLng={mapLng}
            mapLat={mapLat}
            key={store.placeId}
            store={store}
            showLabel={showLabel2}
            isFocus={
              store.placeId === placeId || store.placeId === focusPlaceId
            }
            // isBookmark={store.bookmark}
            isBounce={store.placeId === bouncePlaceId}
            onClick={handleClickMarker}
          />
        )
      })}
    </>
  )
}

export default StoreMarkers
