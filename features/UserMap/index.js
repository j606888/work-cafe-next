import React, { useEffect, useRef } from "react"
import Router from "next/router"
import _ from "lodash"
import useSWR from "swr"
import { fetcher } from "api"
import Marker from "features/GoogleMapWrapper/Marker"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import StoreDetail from "features/StoreDetail"
import { StoreDetailContainer, MyLocationContainer } from "./styled"
import BookmarkTab from "features/BookmarkTab"
import { useSelector, useDispatch } from "react-redux"
import { updatePlaceId } from "store/slices/store"
import HiddenList from "features/HiddenList"
import ContributeList from "features/ContributeList"
import useInitMap from "hooks/useInitMap"
import MyLocation from "features/MyLocation"
import MeMarker from "features/MyLocation/MeMarker"
import SearchStoreList from "features/SearchStoreList"

const UserMap = () => {
  const dispatch = useDispatch()
  const { isReady, mapSettings, map, setMap } = useInitMap()
  const [showCardHead, setShowCardHead] = React.useState(false)
  const { stores, mode, placeId, bouncePlaceId } = useSelector(
    (state) => state.store
  )
  const myLocation = useRef(null)
  const { data: store, mutate: mutateStore } = useSWR(
    placeId ? `/stores/${placeId}` : null,
    fetcher
  )

  const handleOnIdle = ({ lat, lng, zoom }) => {
    const mapPath = `@${lat},${lng},${zoom}z`
    Router.push({
      pathname: `/${mapPath}`,
    })
    localStorage.setItem("lastLocation", mapPath)
  }
  const handleRefreshStore = (placeId) => {
    dispatch(updatePlaceId(placeId))
    mutateStore()
  }
  const clearPlaceId = () => {
    dispatch(updatePlaceId(null))
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
  }, [store])

  if (!isReady) return <div>NotReady</div>

  const me = myLocation.current && (
    <MeMarker lat={myLocation.current.lat} lng={myLocation.current.lng} />
  )

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
      <GoogleMapWrapper
        map={map}
        setMap={setMap}
        onIdle={handleOnIdle}
        mapSettings={mapSettings}
      >
        {me}
        {stores?.map((store) => (
          <Marker
            key={store.placeId}
            store={store}
            focus={store.placeId === placeId}
            bounce={store.placeId === bouncePlaceId}
            onClick={handleRefreshStore}
          />
        ))}
      </GoogleMapWrapper>
    </>
  )
}

export default UserMap
