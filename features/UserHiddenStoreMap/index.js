import GoogleMapWrapper from "features/GoogleMapWrapper"
import Markers from "features/GoogleMapWrapper/Markers"
import React, { useState } from "react"
import useSWR from "swr"
import storeApi from "api/stores"
import Drawer from "features/Drawer"

const UserHiddenStoreMap = () => {
  const [map, setMap] = useState(null)
  const { data: stores } = useSWR("/stores/hidden", storeApi.fetcher)

  function handleCardClick() {}

  return (
    <>
      {stores && <Drawer stores={stores} onClick={handleCardClick} />}
      <GoogleMapWrapper map={map} setMap={setMap} marginTop="56px">
        <Markers
          map={map}
          stores={stores || []}
          // onClick={handleMarkerClick}
          // onMouseover={handleMarkerOver}
          // onMouseout={handleMarkerOut}
        />
      </GoogleMapWrapper>
    </>
  )
}

export default UserHiddenStoreMap
