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

const initialState = {
  lat: 23.0042325,
  lng: 120.2216038,
  openType: "NONE",
  openWeek: null,
  openHour: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_HERE":
      return {
        ...state,
        ...action.payload,
      }
    case "CLEAR_KEYWORD":
      return {
        ...state,
        keyword: "",
      }
    default:
      throw new Error()
  }
}

const UserMapV2 = () => {
  const { mutate } = useSWRConfig()
  const [locationParams, dispatch] = React.useReducer(reducer, initialState)
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
  const { data: stores } = useSWR(
    ["/stores/location", { ...locationParams, limit: 10 }],
    fetcher
  )
  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null, fetcher)
  const handleOnIdle = ({ lat, lng, zoom }) => {
    Router.push({
      pathname: `/map/@${lat},${lng},${zoom}z`,
    })
    mapCenterRef.current = { lat, lng }
    mapZoom.current = zoom
  }
  const handleSearch = () => {
    dispatch({
      type: "SEARCH_HERE",
      payload: {
        ...mapCenterRef.current,
      },
    })
    setPlaceId(null)
  }
  const handleKeywordSearch = (keyword) => {
    dispatch({
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
    dispatch({
      type: "SEARCH_HERE",
      payload: {
        ...openTimeRef.current,
      },
    })
  }
  const handleClear = () => {
    dispatch({ type: "CLEAR_KEYWORD" })
    setPlaceId(null)
  }
  const handleStoreClick = (placeId) => {
    setPlaceId(placeId)
  }
  const handleRefreshStore = (placeId) => {
    mutate(`/stores/${placeId}`)
  }

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
      <UserDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
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
  )
}

export default UserMapV2
