import React, { useEffect, useState } from "react"
import Router from "next/router"
import { useRef } from "react"
import _ from "lodash"
import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "api"
import Marker from "features/GoogleMapWrapper/Marker"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import StoreDetail from "features/StoreDetail"
import SearchbarV2 from "features/SearchbarV2"
import StoreListV2 from "features/StoreListV2"
import OpenTimeV2 from "features/OpenTimeV2"
import SearchHere from "components/Button/SearchHere"
import {
  SearchHereContainer,
  SearchbarV2Container,
  StoreDetailContainer,
  StoreListContainer,
  MenuContainer,
} from "./styled"
import UserDrawer from "features/UserDrawer"
import BookmarkListV2 from "features/BookmarkListV2"
import { useSelector, useDispatch } from 'react-redux'
import { updateStores } from 'store/slices/store'

const initialState = {
  lat: 23.0042325,
  lng: 120.2216038,
  openType: "NONE",
  openWeek: null,
  openHour: null,
  go: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_HERE":
      return {
        ...state,
        ...action.payload,
        go: true,
      }
    case "CLEAR_KEYWORD":
      return {
        ...state,
        keyword: "",
        go: false,
      }
    default:
      throw new Error()
  }
}

const UserMapV2 = () => {
  const dispatch = useDispatch()
  const { mutate } = useSWRConfig()
  const [locationParams, LocationDispatch] = React.useReducer(reducer, initialState)
  const [map, setMap] = React.useState(null)
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const mapZoom = useRef(15)
  const openTimeRef = useRef({})
  const [placeId, setPlaceId] = useState(null)
  const [bouncingId, setBouncingId] = useState(null)
  const { data: locationStores } = useSWR(
    locationParams.go
      ? ["/stores/location", { ...locationParams, limit: 10 }]
      : null,
    fetcher
  )
  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null, fetcher)
  const {stores, mode } = useSelector(state => state.store)
  const handleOnIdle = ({ lat, lng, zoom }) => {
    Router.push({
      pathname: `/map/@${lat},${lng},${zoom}z`,
    })
    mapCenterRef.current = { lat, lng }
    mapZoom.current = zoom
  }
  const handleSearch = () => {
    LocationDispatch({
      type: "SEARCH_HERE",
      payload: {
        ...mapCenterRef.current,
      },
    })
    setPlaceId(null)
  }
  const handleKeywordSearch = (keyword) => {
    LocationDispatch({
      type: "SEARCH_HERE",
      payload: {
        ...mapCenterRef.current,
        keyword,
      },
    })
    setPlaceId(null)
  }
  const handleOpenTimeChange = ({ openType, openWeek, openHour }) => {
    let realOpenHour = openHour === "99" ? null : openHour
    openTimeRef.current = {
      openType,
      openWeek,
      openHour: realOpenHour,
    }
    LocationDispatch({
      type: "SEARCH_HERE",
      payload: {
        ...openTimeRef.current,
      },
    })
  }
  const handleClear = () => {
    LocationDispatch({ type: "CLEAR_KEYWORD" })
    setPlaceId(null)
  }
  const handleStoreClick = (placeId) => {
    setPlaceId(placeId)
  }
  const handleRefreshStore = (placeId) => {
    mutate(`/stores/${placeId}`)
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    setPlaceId(null)
  }

  useEffect(() => {
    dispatch(updateStores(locationStores))
  }, [locationStores, dispatch])

  useEffect(() => {
    if (store) {
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

  // function handleOnClick() {
  //   const city = _.find(cityMap, (city) => city.name === filter.keyword)

  //   if (city && city.center && isFar(city.center, mapCenterRef.current)) {
  //     map.setCenter(city.center)
  //     mapCenterRef.current = city.center
  //   }
  // }

  return (
    <>
      {mode === "MAP" && (
        <>
          <UserDrawer open={openDrawer} onClose={handleCloseDrawer} />
          <SearchbarV2Container>
            <SearchbarV2
              onSearch={handleKeywordSearch}
              hasResult={stores?.length !== 0}
              onClear={handleClear}
              onOpenDrawer={() => setOpenDrawer(true)}
            />
          </SearchbarV2Container>
          <MenuContainer>
            <OpenTimeV2 onChange={handleOpenTimeChange} />
          </MenuContainer>
          <SearchHereContainer>
            <SearchHere onClick={handleSearch} />
          </SearchHereContainer>
          <StoreListContainer>
            <StoreListV2
              stores={stores || []}
              onClick={handleStoreClick}
              onMouseEnter={(placeId) => setBouncingId(placeId)}
              onMouseLeave={() => setBouncingId(null)}
            />
          </StoreListContainer>
          {store && (
            <StoreDetailContainer>
              <StoreDetail
                {...store}
                onClose={() => setPlaceId(null)}
                onHide={handleRefreshStore}
                onUnhide={handleRefreshStore}
              />
            </StoreDetailContainer>
          )}
        </>
      )}
      {mode === "BOOKMARK" && <BookmarkListV2 />}
      <GoogleMapWrapper map={map} setMap={setMap} onIdle={handleOnIdle}>
        {stores?.map((store) => (
          <Marker
            key={store.placeId}
            store={store}
            focus={store.placeId === placeId}
            bounce={store.placeId === bouncingId}
            onClick={handleStoreClick}
          />
        ))}
      </GoogleMapWrapper>
    </>
  )
}

export default UserMapV2
