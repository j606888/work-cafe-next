import { Marker } from "@react-google-maps/api"
import SearchHere from "components/Button/SearchHere"
import Skeleton from "components/Skeleton"
import GoogleMap from "features/GoogleMap"
import StoreMarker from "features/GoogleMap/StoreMarker"
import MyLocation from "features/MyLocation"
import useInitMap from "hooks/useInitMap"
import useMapStore from "hooks/useMapStore"
import useStoreStore from "hooks/useStoreStore"
import Router from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useSWR from "swr"
import ShowLabelCheckbox from "./ShowLabelCheckbox"

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 88px;
  width: calc(100% - 677px);
  height: calc(100vh - 88px);

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

const MyLocationContainer = styled.div`
  position: absolute;
  bottom: 7rem;
  right: 0.7rem;
  z-index: 2;
`

const SearchHereContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 1rem;
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
  const [showLabel, setShowLabel] = useState(true)

  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null)

  function handleLoad(map) {
    setMap(map)
  }

  useEffect(() => {
    if (!map) return

    const zoom = map.zoom
    const { lat, lng } = map.center.toJSON()
    setCenter({ lat, lng })

    const mapPath = _mapPath(lat, lng, zoom, placeId)
    _navigateTo(`/${mapPath}`)
    _setLocalStorage("lastLocation", mapPath)
  }, [placeId])

  function handleIdle() {
    if (!map) return

    const zoom = map.zoom
    const { lat, lng } = map.center.toJSON()
    setCenter({ lat, lng })

    const mapPath = _mapPath(lat, lng, zoom, placeId)
    _navigateTo(`/${mapPath}`)
    _setLocalStorage("lastLocation", mapPath)
  }

  const handleFindMe = ({ lat, lng }) => {
    const center = { lat, lng }
    map.setZoom(15)
    map.panTo(center)
    myLocation.current = center
  }

  function handleClickMarker(placeId) {
    setPlaceId(placeId)
  }

  function handleSearchHere() {
    setLastLatLng(center)
    setPlaceId(null)
  }

  function handleToggle(checked) {
    setShowLabel(checked)
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
        {myLocation.current && (
          <Marker
            position={{
              lat: myLocation.current.lat,
              lng: myLocation.current.lng,
            }}
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
            // showLabel={store.placeId === mouseOverStoreId || showLabel}
            // onMouseOver={(placeId) => setMouseOverStoreId(placeId)}
            // onMouseOut={() => setMouseOverStoreId(null)}
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

function _mapPath(lat, lng, zoom, placeId) {
  return [`@${lat.toFixed(5)},${lng.toFixed(5)},${zoom}z`, placeId]
    .filter(Boolean)
    .join("/")
}

function _navigateTo(path) {
  Router.push(path)
}

function _setLocalStorage(key, value) {
  localStorage.setItem(key, value)
}
export default MapV2
