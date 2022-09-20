import React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import useSWR from "swr"
import StorePhotoCard from "../StorePhotoCard"
import useStoreStore from "hooks/useStoreStore"

const Container = styled.div`
  height: calc(100vh - 80px - 48px);
  overflow-y: scroll;
  width: 374px;
`

const StorePhotoList = () => {
  const clearStores = useStoreStore(state => state.clearStores)
  const setStores = useStoreStore(state => state.setStores)
  const setPlaceId = useStoreStore(state => state.setPlaceId)
  const setBouncePlaceId = useStoreStore(state => state.setBouncePlaceId)
  const { data } = useSWR("/store-photos")

  const handleClick = (placeId) => {
    setPlaceId(placeId)
  }
  const handleMouseEnter = (placeId) => {
    setBouncePlaceId(placeId)
  }
  const handleMouseLeave = (_placeId) => {
    setBouncePlaceId(null)
  }

  useEffect(() => {
    const stores = data?.storePhotoGroups.map((storePhoto) => storePhoto.store)
    if (stores) {
      setStores(stores)
    } else {
      clearStores()
    }
  }, [data])

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
