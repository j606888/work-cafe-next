import React, { useContext, useEffect, useState } from "react"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import Drawer from "features/Drawer"
import storeApi from "api/stores"
import FilterContext from "contexts/FilterContext"
import Router from "next/router"
import { useRef } from "react"
import Searchbar from "features/Searchbar"
import styled from "styled-components"
import cityMap from "config/cityMap"
import _ from "lodash"
import StoreDetail from "features/StoreDetail"
import useSWR from "swr"
import Snackbar from "components/Snackbar"

const FloatSearchBar = styled.div`
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
`

const StoreDetailContainer = styled.div`
  position: absolute;
  left: 30rem;
  top: 8rem;
  z-index: 100;
`

function isFar(t1, t2) {
  return Math.abs(t1.lat - t2.lat) > 0.2 || Math.abs(t1.lng - t2.lng) > 0.2
}

const UserStoreMap = () => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [map, setMap] = useState(null)
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const [placeId, setPlaceId] = useState(null)
  const [stores, setStores] = useState([])
  const { keyword, openTime } = useContext(FilterContext)
  const { data: storesData } = useSWR(
    [
      "/stores/location",
      {
        ...mapCenterRef.current,
        ...openTime,
        keyword,
      },
    ],
    storeApi.storesFetcher
  )

  const { data } = useSWR(
    placeId ? `/stores/${placeId}` : null,
    storeApi.fetcher
  )

  useEffect(() => {
    if (storesData) {
      setStores(storesData)

      if (storesData.length === 1) {
        const center = {
          lat: storesData[0].lat,
          lng: storesData[0].lng,
        }
        map.setCenter(center)
        map.setZoom(15)
      }
    } else {
      setStores([])
    }
  }, [storesData])

  function handleOnClick() {
    const city = _.find(cityMap, (city) => city.name === keyword)

    if (city && city.center && isFar(city.center, mapCenterRef.current)) {
      map.setCenter(city.center)
      mapCenterRef.current = city.center
    }
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
    // getOneStoreApi.request({ placeId })
    setPlaceId(placeId)
  }

  const handleMarkerClick = (placeId) => {
    // getOneStoreApi.request({ placeId })
    setPlaceId(placeId)
  }

  const handleHideStore = async (placeId) => {
    await storeApi.hideStore({ placeId })
    setShowSnackbar(true)
    setPlaceId(null)
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
        key={store.placeId}
        id={store.placeId}
        store={store}
        onClick={handleMarkerClick}
        onMouseover={handleMarkerOver}
        onMouseout={handleMarkerOut}
      />
    )
  })

  return (
    <>
      {showSnackbar && <Snackbar onClose={() => setShowSnackbar(false)} 
        message="成功隱藏店家"
      />}
      <FloatSearchBar>
        <Searchbar onClick={handleOnClick} />
      </FloatSearchBar>
      <Drawer stores={stores} onClick={handleCardClick} />

      {data && (
        <StoreDetailContainer>
          <StoreDetail
            {...data}
            onClose={() => setPlaceId(null)}
            onHide={handleHideStore}
          />
        </StoreDetailContainer>
      )}

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
