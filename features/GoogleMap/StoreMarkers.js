import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import useSearchStores from "hooks/useSearchStores"
import { useRouter } from "next/router"
import React from "react"
import store from "stores/store"
import StoreMarker from "./StoreMarker"

const StoreMarkers = () => {
  const router = useRouter()
  const { data: stores } = useSearchStores()
  const { placeId, setPlaceId, setPanelType, map, showLabel } = store((state) => ({
    placeId: state.placeId,
    setPlaceId: state.setPlaceId,
    setPanelType: state.setPanelType,
    map: state.map,
    showLabel: state.showLabel,
  }))
  const fullScreen = useMediaQuery(devices.mobileXl)

  function handleClickMarker(placeId) {
    if (fullScreen) {
    } else {
      const lat = map.center.lat().toFixed(6)
      const lng = map.center.lng().toFixed(6)
      const zoom = map.zoom

      setPlaceId(placeId)
      setPanelType("STORE_DETAIL")
      router.push(`place/${placeId}/@${lat},${lng},${zoom}z`)
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
            showLabel={showLabel}
            isFocus={store.placeId === placeId}
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
