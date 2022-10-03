import SearchHere from 'components/Button/SearchHere'
import Skeleton from 'components/Skeleton'
import GoogleMap from 'features/GoogleMap'
import StoreMarker from 'features/GoogleMap/StoreMarker'
import useInitMap from 'hooks/useInitMap'
import useMapStore from 'hooks/useMapStore'
import useStoreStore from 'hooks/useStoreStore'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 64px;
  width: 50%;
  height: calc(100vh - 64px);

  .labels {
    background-color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 12px;
    padding: 4px 8px;
    border: 1px solid #999;
    box-sizing: border-box;
    position: absolute;
    bottom: 2.3rem;
    left: 0.8rem;
    overflow: hidden;
    max-width: 240px;
  }
`

const SearchHereContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
  z-index: 2;
`

const MapV2 = () => {
  const { isReady, myLocation, map, setMap, mapSettings } = useInitMap()
  const setCenter = useMapStore((state) => state.setCenter)
  const center = useMapStore((state) => state.center)
  const setLastLatLng = useMapStore((state) => state.setLastLatLng)
  const stores = useStoreStore((state) => state.stores)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const placeId = useStoreStore((state) => state.placeId)
  const bouncePlaceId = useStoreStore((state) => state.bouncePlaceId)

  function handleLoad(map) {
    setMap(map)
  }

  function handleIdle () {
    if (!map) return

    const zoom = map.zoom
    const { lat, lng } = map.center.toJSON()
    setCenter({ lat, lng })

    // const mapPath = _mapPath(lat, lng, zoom, placeId)
    // _navigateTo(`/${mapPath}`)
    // _setLocalStorage("lastLocation", mapPath)
  }

  function handleClickMarker(placeId) {
    setPlaceId(placeId)
  }

  function handleSearchHere() {
    setLastLatLng(center)
  }

  if (!isReady) return <Skeleton />

  return (
    <Container>
      <SearchHereContainer>
        <SearchHere onClick={handleSearchHere} />
      </SearchHereContainer>
      <GoogleMap
        onLoad={handleLoad}
        onIdle={handleIdle}
        mapSettings={mapSettings}
      >
        {stores.map((store) => (
            <StoreMarker
              key={store.placeId}
              store={store}
              showLabel={true}
              isFocus={store.placeId === placeId}
              isBounce={store.placeId === bouncePlaceId}
              // showLabel={store.placeId === mouseOverStoreId || showLabel}
              // onMouseOver={(placeId) => setMouseOverStoreId(placeId)}
              // onMouseOut={() => setMouseOverStoreId(null)}
              onClick={handleClickMarker}
            />
          ))}
      </GoogleMap>
    </Container>
  )
}

export default MapV2
