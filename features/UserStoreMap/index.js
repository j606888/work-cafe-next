import React, { useEffect, useRef } from "react"
import Router from "next/router"
import _ from "lodash"
import useSWR from "swr"
import { fetcher } from "api"
import Marker from "features/GoogleMapWrapper/Marker"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import StoreDetail from "features/StoreDetail"
import { StoreDetailContainer, MyLocationContainer } from "./styled"
import BookmarkListV2 from "features/BookmarkListV2"
import { useSelector, useDispatch } from "react-redux"
import { updateStores, updatePlaceId } from "store/slices/store"
import HiddenListV2 from "features/HiddenListV2"
import ReviewList from "features/ReviewList"
import useInitMap from "hooks/useInitMap"
import MyLocation from "features/MyLocation"
import MeMarker from "features/MyLocation/MeMarker"
import SearchStoreList from "features/SearchStoreList"

const UserStoreMap = () => {
  const dispatch = useDispatch()
  const { isReady, mapSettings, map, setMap } = useInitMap()
  const [showCardHead, setShowCardHead] = React.useState(false)
  const { stores, mode, placeId, bouncePlaceId } = useSelector(
    (state) => state.store
  )
  const mapZoom = useRef(15)
  const meCenter = useRef(null)
  const [options, setOptions] = React.useState({})
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const { data: locationStores, mutate: mutateLocation } = useSWR(
    options?.go ? ["/stores/location", { ...options, limit: 20 }] : null,
    fetcher
  )
  const { data: store, mutate: mutateStore } = useSWR(placeId ? `/stores/${placeId}` : null, fetcher)

  const handleSearch = (searchOptions) => {
    setOptions({ ...searchOptions, ...mapCenterRef.current })
    mutateLocation()
  }
  const handleOnIdle = ({ lat, lng, zoom }) => {
    const mapPath = `@${lat},${lng},${zoom}z`
    Router.push({
      pathname: `/${mapPath}`,
    })
    localStorage.setItem("lastLocation", mapPath)
    mapCenterRef.current = { lat, lng }
    mapZoom.current = zoom
  }
  const handleRefreshStore = (placeId) => {
    dispatch(updatePlaceId(placeId))
    mutateStore()
    mutateLocation()
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
    mapCenterRef.current = center
    meCenter.current = center
  }

  useEffect(() => {
    dispatch(updateStores(locationStores))
  }, [locationStores])

  useEffect(() => {
    if (store && map) {
      const center = {
        lat: store.lat,
        lng: store.lng,
      }
      if (mapZoom.current < 15) {
        map.setZoom(15)
      }
      map.panTo(center)
      map.panBy(-400, 0)

      mapCenterRef.current = center
    }
  }, [store])

  if (!isReady) return <div>NotReady</div>

  const me = meCenter.current && (
    <MeMarker lat={meCenter.current.lat} lng={meCenter.current.lng} />
  )

  return (
    <>
      {store && (
        <StoreDetailContainer onScroll={handleScroll}>
          <StoreDetail
            {...store}
            onClose={clearPlaceId}
            onRefresh={handleRefreshStore}
            showCardHead={showCardHead}
          />
        </StoreDetailContainer>
      )}
      <MyLocationContainer>
        <MyLocation onClick={handleFindMe} />
      </MyLocationContainer>
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
        {mode === "MAP" && (
          <SearchStoreList
            store={store}
            onSearch={handleSearch}
            onClearPlaceId={clearPlaceId}
          />
        )}
        {mode === "BOOKMARK" && <BookmarkListV2 />}
        {mode === "HIDDEN" && <HiddenListV2 />}
        {mode === "REVIEW" && <ReviewList />}
      </GoogleMapWrapper>
    </>
  )
}

export default UserStoreMap
