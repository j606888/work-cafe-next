import React, { useEffect, useState } from "react"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import Router from "next/router"
import { useRef } from "react"
import styled from "styled-components"
import _ from "lodash"
import StoreDetail from "features/StoreDetail"
import useSWR, { useSWRConfig } from "swr"
import Snackbar from "components/Snackbar"
import { useSelector } from "react-redux"
import { fetcher } from "api"
import SearchHere from "components/Button/SearchHere"
import SearchbarV2 from "features/SearchbarV2"
import StoreListV2 from "features/StoreListV2"
import OpenTimeV2 from "features/OpenTimeV2"

const SearchHereContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`

const SearchbarV2Container = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 3;
`

const StoreDetailContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`

const MenuContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 27rem;
  z-index: 2;
`

const UserMapV2 = () => {
  const [map, setMap] = React.useState(null)
  const [locationParams, setLocationParams] = React.useState({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const { data: stores } = useSWR(
    ["/stores/location", { ...locationParams, limit: 10 }],
    fetcher
  )
  const handleOnIdle = ({ lat, lng, zoom }) => {
    Router.push({
      pathname: `/map/@${lat},${lng},${zoom}z`,
    })
    mapCenterRef.current = { lat, lng }
  }
  const handleSearch = () => {
    setLocationParams(mapCenterRef.current)
  }
  const handleKeywordSearch = (keyword) => {
    setLocationParams({ ...mapCenterRef.current, keyword })
  }
  const handleOpenTimeChange = ({ openType, openWeek, openHour }) => {
    let realOpenHour = openHour === "99" ? null : openHour
    setLocationParams((cur) => ({
      ...cur,
      openType,
      openWeek,
      openHour: realOpenHour,
    }))
  }
  // function handleOnClick() {
  //   const city = _.find(cityMap, (city) => city.name === filter.keyword)

  //   if (city && city.center && isFar(city.center, mapCenterRef.current)) {
  //     map.setCenter(city.center)
  //     mapCenterRef.current = city.center
  //   }
  // }

  const markers = stores?.map((store) => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      },
    }

    return (
      <Marker
        options={options}
        key={store.placeId}
        id={store.placeId}
        store={store}
      />
    )
  })

  return (
    <>
      <SearchbarV2Container>
        <SearchbarV2 onSearch={handleKeywordSearch} />
      </SearchbarV2Container>
      <MenuContainer>
        <OpenTimeV2 onChange={handleOpenTimeChange} />
      </MenuContainer>
      {/* {stores && (
        <StoreDetailContainer>
          <StoreDetail {...stores[0]} />
        </StoreDetailContainer>
      )} */}
      <SearchHereContainer>
        <SearchHere onClick={handleSearch} />
      </SearchHereContainer>
      <GoogleMapWrapper map={map} setMap={setMap} onIdle={handleOnIdle}>
        {markers}
      </GoogleMapWrapper>
      {/* <StoreDetailContainer>
        <StoreListV2 stores={stores || []} />
      </StoreDetailContainer> */}
    </>
  )
}

export default UserMapV2
