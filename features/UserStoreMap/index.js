import React, { useContext, useEffect, useState } from "react"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import Drawer from "features/Drawer"
import useApi from "hooks/useApi"
import storeApi from "api/stores"
import FilterContext from "contexts/FilterContext"
import Router from "next/router"
import { useRef } from "react"
import Searchbar from "features/Searchbar"
import styled from "styled-components"
import cityMap from "config/cityMap"
import _ from "lodash"
import StoreDetail from "features/StoreDetail"

const FloatSearchBar = styled.div`
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
`

// function calcCenter(stores) {
//   const length = stores.length
//   const lat = stores.reduce((acc, object) => acc + object.lat, 0) / length
//   const lng = stores.reduce((acc, object) => acc + object.lng, 0) / length
//   return { lat, lng }
// }

const StoreDetailContainer = styled.div`
  position: absolute;
  left: 30rem;
  top: 8rem;
  z-index: 100;
`

function isFar(t1, t2) {
  return (Math.abs(t1.lat - t2.lat) > 0.2 || Math.abs(t1.lng - t2.lng) > 0.2)
}

const UserStoreMap = () => {
  const [map, setMap] = useState(null)
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const [stores, setStores] = useState([])
  const getStoresApi = useApi(storeApi.getPublicStoresByLocation)
  const getOneStoreApi = useApi(storeApi.getPublicStore)
  const { keyword, openTime } = useContext(FilterContext)

  useEffect(() => {
    const result = getStoresApi.data

    if (result) {
      setStores(result)

      if (result.length === 1) {
        const center = {
          lat: result[0].lat,
          lng: result[0].lng
        }
        map.setCenter(center)
        map.setZoom(15)
      }
    } else {
      setStores([])
    }
  }, [getStoresApi.data])

  useEffect(() => {
    callAPI()
  }, [openTime])

  function callAPI() {
    getStoresApi.request({
      ...mapCenterRef.current,
      ...openTime,
      keyword,
    })
  }

  function handleOnClick() {
    const city = _.find(cityMap, (city) => city.name === keyword)

    if (city && city.center && isFar(city.center, mapCenterRef.current)) {
      map.setCenter(city.center)
      mapCenterRef.current = city.center
    }
    callAPI()
  }

  const handleOnIdle = ({ lat, lng, zoom }) => {
    Router.push({
      pathname: `/map/@${lat},${lng},${zoom}z`,
    })
    mapCenterRef.current = { lat, lng }
  }

  const handleMarkerOver = (id) => {
    // console.log(`id ${id} was hovered`)
  }

  const handleMarkerOut = (id) => {
    // console.log(`id ${id} was out`)
  }

  const handleCardClick = async (placeId) => {
    getOneStoreApi.request({ placeId })
  }

  const markers = stores.map((store) => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      },
    }

    return (
      <Marker
        options={options}
        key={store.id}
        id={store.id}
        store={store}
        // onClick={handleMarkerClick}
        onMouseover={handleMarkerOver}
        onMouseout={handleMarkerOut}
      />
    )
  })

  return (
    <>
      <FloatSearchBar>
        <Searchbar onClick={handleOnClick} />
      </FloatSearchBar>
      <Drawer stores={stores} onClick={handleCardClick} />
      
      {getOneStoreApi.data && <StoreDetailContainer><StoreDetail {...getOneStoreApi.data} /></StoreDetailContainer>}
      
      <GoogleMapWrapper
        map={map}
        setMap={setMap}
        onIdle={handleOnIdle}
        marginTop="56px"
      >
        {markers}
      </GoogleMapWrapper>
    </>
  )
}

export default UserStoreMap
