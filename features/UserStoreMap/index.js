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

const UserMapV2 = () => {
  const { mutate } = useSWRConfig()

  const [map, setMap] = React.useState(null)
  const [locationParams, setLocationParams] = React.useState({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })
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
  }
  const handleSearch = () => {
    setLocationParams((cur) => ({
      ...cur,
      ...mapCenterRef.current,
      ...openTimeRef.current,
    }))
    setPlaceId(null)
  }
  const handleKeywordSearch = (keyword) => {
    setLocationParams({
      ...mapCenterRef.current,
      ...openTimeRef.current,
      keyword,
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
    setLocationParams((cur) => ({
      ...cur,
      ...openTimeRef.current,
    }))
  }
  const handleClear = () => {
    setLocationParams((cur) => ({
      ...cur,
      keyword: "",
    }))
    setPlaceId(null)
  }
  const handleStoreClick = (placeId) => {
    setPlaceId(placeId)
  }
  const handleCloseDetail = () => {
    setPlaceId(null)
  }
  const handleMouseEnter = (placeId) => {
    setBouncingId(placeId)
  }
  const handleMouseLeave = (placeId) => {
    setBouncingId(null)
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
      map.setZoom(15)
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
      <SearchbarV2Container>
        <SearchbarV2
          onSearch={handleKeywordSearch}
          hasResult={stores?.length !== 0}
          onClear={handleClear}
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </StoreListContainer>
      {store && (
        <StoreDetailContainer>
          <StoreDetail
            {...store}
            onClose={handleCloseDetail}
            onHide={handleRefreshStore}
            onUnhide={handleRefreshStore}
          />
        </StoreDetailContainer>
      )}
    </>
  )
}

export default UserMapV2
