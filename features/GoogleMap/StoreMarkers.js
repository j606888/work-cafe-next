import useSearchStores from "hooks/useSearchStores"
import React from "react"
import store from "stores/store"
import StoreMarker from "./StoreMarker"

const StoreMarkers = () => {
  const { data: stores } = useSearchStores()
  const { placeId, map } = store((state) => ({
    placeId: state.placeId,
    map: state.map
  }))

  if (!stores) return null

  const mapLng = map.center.lng()

  return (
    <>
      {stores.stores.map((store) => {
        return (
          <StoreMarker
            mapLng={mapLng}
            key={store.placeId}
            store={store}
            // isBookmark={store.bookmark}
            showLabel={true}
            isFocus={store.placeId === placeId}
            // isBounce={store.placeId === bouncePlaceId}
            // onClick={handleClickMarker}
          />
        )
      })}
    </>
  )
}

export default StoreMarkers
