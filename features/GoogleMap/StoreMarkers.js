import { useMediaQuery } from "@mui/material"

import useSearchStores from "hooks/useSearchStores"
import useUpdateURL from "hooks/useUpdateURL"
import React, { useEffect } from "react"
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
  const fullScreen = useMediaQuery('(max-width: 720px)')
  const showLabel2 =
    (!fullScreen && showLabel) || (fullScreen && map?.zoom >= 16)

  function handleClickMarker(placeId) {
    if (fullScreen) {
      setFocusPlaceId(placeId)
    } else {
      setPlaceId(placeId)
      setFocusPlaceId(placeId)
      setCenterWithPlaceIdToURL(placeId)
    }
  }

  useEffect(() => {
    if (map && stores && stores.stores.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      stores.stores.forEach((store) => {
        bounds.extend(new window.google.maps.LatLng(store.lat, store.lng))
      })
      map.fitBounds(bounds)
      if (stores.stores.length === 1) map.setZoom(17)
    }
  }, [stores, map])

  if (!stores || !map) return null

  let storeList = stores.stores
  if (store && !storeList.map((store) => store.placeId).includes(store.placeId))
    storeList = [...storeList, store]

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
            isBookmark={store.bookmark}
            isBounce={store.placeId === bouncePlaceId}
            onClick={handleClickMarker}
          />
        )
      })}
    </>
  )
}

export default StoreMarkers
