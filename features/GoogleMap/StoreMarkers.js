import useSearchStores from "hooks/useSearchStores"
import React from "react"
import StoreMarker from "./StoreMarker"

const StoreMarkers = () => {
  const { data: stores } = useSearchStores()

  if (!stores) return null

  return (
    <>
      {stores.stores.map((store) => {
        return (
          <StoreMarker
            key={store.placeId}
            store={store}
            // isBookmark={store.bookmark}
            showLabel={true}
            // isFocus={isFocus}
            // isBounce={store.placeId === bouncePlaceId}
            // onClick={handleClickMarker}
          />
        )
      })}
    </>
  )
}

export default StoreMarkers
