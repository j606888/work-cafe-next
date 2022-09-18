import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import useSWR from "swr"
import StorePhotoCard from "../StorePhotoCard"
import {
  updateFocusPlaceId,
  updatePlaceId,
  updateStores,
} from "store/slices/store"

const Container = styled.div`
  height: calc(100vh - 80px - 48px);
  overflow-y: scroll;
  width: 374px;
`

const StorePhotoList = () => {
  const { data } = useSWR("/store-photos")
  const dispatch = useDispatch()

  const handleClick = (placeId) => {
    dispatch(updatePlaceId(placeId))
  }
  const handleMouseEnter = (placeId) => {
    dispatch(updateFocusPlaceId(placeId))
  }
  const handleMouseLeave = (_placeId) => {
    dispatch(updateFocusPlaceId(null))
  }

  useEffect(() => {
    const stores = data?.storePhotoGroups.map((storePhoto) => storePhoto.store)
    dispatch(updateStores(stores || []))
  }, [dispatch, data])

  return (
    <Container>
      {data?.storePhotoGroups.map((storePhotoGroup) => {
        return <StorePhotoCard
          key={storePhotoGroup.id}
          {...storePhotoGroup}
          photos={storePhotoGroup.photos}
          store={storePhotoGroup.store}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      }
      )}
      {/* {data?.storePhotoGroups.map((storePhoto) => (
        <StorePhotoCard
          key={storePhoto.id}
          {...storePhoto}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))} */}
    </Container>
  )
}

export default StorePhotoList
