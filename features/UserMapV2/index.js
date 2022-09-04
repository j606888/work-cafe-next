import React, { useEffect, useState } from "react"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import Drawer from "features/Drawer"
import storeApi from "api/stores"
import Router from "next/router"
import { useRef } from "react"
import Searchbar from "features/Searchbar"
import styled from "styled-components"
import cityMap from "config/cityMap"
import _ from "lodash"
import StoreDetail from "features/StoreDetail"
import useSWR, { useSWRConfig } from "swr"
import Snackbar from "components/Snackbar"
import { useSelector } from "react-redux"
import { fetcher } from "api"
import SearchHere from "components/Button/SearchHere"

const SearchHereContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
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
      pathname: `/mapv2/@${lat},${lng},${zoom}z`,
    })
    mapCenterRef.current = { lat, lng }
  }
  const handleSearch = () => {
    setLocationParams(mapCenterRef.current)
  }

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

  useEffect(() => {
    console.log(stores)
  }, [stores])

  return (
    <>
      <SearchHereContainer>
        <SearchHere onClick={handleSearch} />
      </SearchHereContainer>
      <GoogleMapWrapper map={map} setMap={setMap} onIdle={handleOnIdle}>
        {markers}
      </GoogleMapWrapper>
    </>
  )
}

export default UserMapV2
