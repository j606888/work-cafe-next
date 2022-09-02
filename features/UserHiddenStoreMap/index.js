import GoogleMapWrapper from "features/GoogleMapWrapper"
import Markers from "features/GoogleMapWrapper/Markers"
import React, { useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import storeApi from "api/stores"
import Drawer from "features/Drawer"
import StoreDetail from "features/StoreDetail"
import styled from "styled-components"

const StoreDetailContainer = styled.div`
  position: absolute;
  left: 30rem;
  top: 8rem;
  z-index: 100;
`

const UserHiddenStoreMap = () => {
  const [map, setMap] = useState(null)
  const [placeId, setPlaceId] = useState(null)
  const { mutate } = useSWRConfig()
  const { data: stores } = useSWR("/stores/hidden", storeApi.fetcher)
  const { data: store } = useSWR(
    placeId ? `/stores/${placeId}` : null,
    storeApi.fetcher
  )

  function handleStoreClick(placeId) {
    setPlaceId(placeId)
  }

  async function handleOnUnhide(placeId) {
    await storeApi.unhideStore({ placeId })
    mutate(`/stores/${placeId}`)
    mutate(`/stores/hidden`)
  }

  async function handleOnHide(placeId) {
    await storeApi.hideStore({ placeId })
    mutate(`/stores/${placeId}`)
    mutate(`/stores/hidden`)
  }

  useEffect(() => {
    if (store) {
      const center = {
        lat: store.lat,
        lng: store.lng,
      }
      map.setZoom(15)
      map.panTo(center)
    }
  }, [store])
  return (
    <>
      {stores && <Drawer stores={stores} onClick={handleStoreClick} />}

      {store && (
        <StoreDetailContainer>
          <StoreDetail {...store} onClose={() => setPlaceId(null)} onUnhide={handleOnUnhide}
          onHide={handleOnHide}
          />
        </StoreDetailContainer>
      )}
      <GoogleMapWrapper map={map} setMap={setMap} marginTop="56px">
        <Markers
          map={map}
          stores={stores || []}
          onClick={handleStoreClick}
        />
      </GoogleMapWrapper>
    </>
  )
}

export default UserHiddenStoreMap
