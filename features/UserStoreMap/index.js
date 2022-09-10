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
  top: 4rem;
  left: calc(50% + 12rem);
  transform: translateX(-50%);
  z-index: 5;
`

const SearchbarV2Container = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 3;
`

const StoreDetailContainer = styled.div`
  position: absolute;
  top: 4rem;
  left: 28rem;
  z-index: 2;
  height: 94vh;
  border-radius: 12px;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`

const StoreListContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`

const MenuContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 28rem;
  z-index: 2;
`

const ICON_URL =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"

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
  const openTimeRef = useRef({})
  const [placeId, setPlaceId] = useState(null)
  const [markers, setMarkers] = useState([])
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

  useEffect(() => {
    const temp = stores?.map((store) => {
      const options = {
        position: {
          lat: store.lat,
          lng: store.lng,
        },
        icon: store.placeId === placeId ? ICON_URL : null,
      }

      return (
        <Marker
          options={options}
          key={store.placeId}
          id={store.placeId}
          onClick={handleStoreClick}
          store={store}
        />
      )
    })

    setMarkers(temp)
  }, [stores, placeId])

  return (
    <>
      <SearchbarV2Container>
        <SearchbarV2
          onSearch={handleKeywordSearch}
          hasResult={markers?.length !== 0}
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
        {markers}
      </GoogleMapWrapper>
      <StoreListContainer>
        <StoreListV2 stores={stores || []} onClick={handleStoreClick} />
      </StoreListContainer>
      {store && (
        <StoreDetailContainer>
          <StoreDetail {...store} onClose={handleCloseDetail} />
        </StoreDetailContainer>
      )}
    </>
  )
}

export default UserMapV2
