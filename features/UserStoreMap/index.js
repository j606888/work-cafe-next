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

const FloatSearchBar = styled.div`
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
`

const UserStoreMap = () => {
  const [map, setMap] = useState(null)
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const [stores, setStores] = useState([])
  const getStoresApi = useApi(storeApi.getPublicStoresByLocation)
  const { keyword, openTime } = useContext(FilterContext)

  useEffect(() => {
    const result = getStoresApi.data
    setStores(result || [])
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
        <Searchbar onClick={handleOnClick}/>
      </FloatSearchBar>
      <Drawer stores={stores}/>
      <GoogleMapWrapper map={map} setMap={setMap} onIdle={handleOnIdle}marginTop="56px">
        {markers}
      </GoogleMapWrapper>
    </>
  )
}

export default UserStoreMap
