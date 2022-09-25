import React, { useEffect, useState } from "react"
import Router from "next/router"
import _ from "lodash"
import useSWR from "swr"
import StoreDetail from "features/StoreDetail"
import {
  StoreDetailContainer,
  MyLocationContainer,
  MarkerStyle,
} from "./styled"
import BookmarkTab from "features/BookmarkTab"
import HiddenList from "features/HiddenList"
import ContributeList from "features/ContributeList"
import useInitMap from "hooks/useInitMap"
import MyLocation from "features/MyLocation"
import SearchStoreList from "features/SearchStoreList"
import Skeleton from "components/Skeleton"
import useMapStore from "hooks/useMapStore"
import useStoreStore from "hooks/useStoreStore"
import ShowLabelCheckbox from "./ShowLabelCheckbox"
import GoogleMap from "features/GoogleMap"
import { Marker } from "@react-google-maps/api"
import StoreMarker from "features/GoogleMap/StoreMarker"

const UserMap = () => {
  const mode = useMapStore((state) => state.mode)
  const { stores, placeId, setPlaceId, bouncePlaceId } = useStoreStore()
  const { isReady, myLocation, map, setMap } = useInitMap()
  const [showCardHead, setShowCardHead] = React.useState(false)
  const [showLabel, setShowLabel] = useState(true)
  const [mouseOverStoreId, setMouseOverStoreId] = useState(null)
  const { data: store, mutate: mutateStore } = useSWR(
    placeId ? `/stores/${placeId}` : null
  )

  const handleIdle = () => {
    if (!map) return

    const zoom = map.zoom
    const { lat, lng } = map.center.toJSON()

    const mapPath = [`@${lat},${lng},${zoom}z`, placeId]
      .filter(Boolean)
      .join("/")
    Router.push({
      pathname: `/${mapPath}`,
    })
    localStorage.setItem("lastLocation", mapPath)
  }
  const handleRefreshStore = (placeId) => {
    setPlaceId(placeId)
    mutateStore()
  }
  const clearPlaceId = () => {
    setPlaceId(null)
  }
  const handleScroll = (event) => {
    const showHead = event.currentTarget.scrollTop !== 0
    setShowCardHead(showHead)
  }
  const handleFindMe = ({ lat, lng }) => {
    const center = { lat, lng }
    map.setZoom(15)
    map.panTo(center)
    myLocation.current = center
  }
  const handleLoad = (map) => {
    setMap(map)
  }

  useEffect(() => {
    if (store && map) {
      const center = {
        lat: store.lat,
        lng: store.lng,
      }
      if (map.zoom < 15) {
        map.setZoom(15)
      }
      map.panTo(center)
      map.panBy(-400, 0)
    }
  }, [store, map])

  const handleToggle = (checked) => {
    setShowLabel(checked)
  }

  if (!isReady) return <Skeleton />

  return (
    <>
      <MyLocationContainer>
        <MyLocation onClick={handleFindMe} />
      </MyLocationContainer>
      {mode === "MAP" && (
        <SearchStoreList store={store} mapCenter={map?.center?.toJSON()} />
      )}
      {mode === "BOOKMARK" && <BookmarkTab />}
      {mode === "HIDDEN" && <HiddenList />}
      {mode === "REVIEW" && <ContributeList />}
      {stores && store && (
        <StoreDetailContainer onScroll={handleScroll}>
          <StoreDetail
            {...store}
            onClose={clearPlaceId}
            onRefresh={handleRefreshStore}
            showCardHead={showCardHead}
          />
        </StoreDetailContainer>
      )}
      <ShowLabelCheckbox onChange={handleToggle} />
      <MarkerStyle>
        <GoogleMap onIdle={handleIdle} onLoad={handleLoad}>
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
          {stores?.map((store) => (
            <StoreMarker
              key={store.placeId}
              store={store}
              isFocus={store.placeId === placeId}
              isBounce={store.placeId === bouncePlaceId}
              showLabel={store.placeId === mouseOverStoreId || showLabel}
              onMouseOver={(placeId) => setMouseOverStoreId(placeId)}
              onMouseOut={() => setMouseOverStoreId(null)}
              onClick={handleRefreshStore}
            />
          ))}
          {stores?.length === 0 && store && (
            <StoreMarker
              onClick={() => handleRefreshStore(store.placeId)}
              store={store}
              isFocus={true}
              isBounce={store.placeId === bouncePlaceId}
            />
          )}
        </GoogleMap>
      </MarkerStyle>
    </>
  )
}

export default UserMap
