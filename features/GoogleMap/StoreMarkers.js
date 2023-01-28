import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import useSearchStores from "hooks/useSearchStores"
import { useRouter } from "next/router"
import React from "react"
import store, { PANEL_TYPES } from "stores/store"
import StoreMarker from "./StoreMarker"

const StoreMarkers = () => {
  const router = useRouter()
  const { data: stores } = useSearchStores()
  const {
    placeId,
    setPlaceId,
    focusPlaceId,
    setFocusPlaceId,
    setPanelType,
    map,
    showLabel,
  } = store((state) => ({
    placeId: state.placeId,
    setPlaceId: state.setPlaceId,
    setFocusPlaceId: state.setFocusPlaceId,
    focusPlaceId: state.focusPlaceId,
    setPanelType: state.setPanelType,
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
      const lat = map.center.lat().toFixed(6)
      const lng = map.center.lng().toFixed(6)
      const zoom = map.zoom

      setPlaceId(placeId)
      setFocusPlaceId(placeId)
      setPanelType(PANEL_TYPES.STORE_DETAIL)
      router.push(`/place/${placeId}/@${lat},${lng},${zoom}z`, undefined, {
        shallow: true,
      })
    }
  }

  if (!stores || !map) return null

  const mapLng = map.center.lng()
  const mapLat = map.center.lat()

  return (
    <>
      {stores.stores.map((store) => {
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
            // isBounce={store.placeId === bouncePlaceId}
            onClick={handleClickMarker}
          />
        )
      })}
    </>
  )
}

export default StoreMarkers
