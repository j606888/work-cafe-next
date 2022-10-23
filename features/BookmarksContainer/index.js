import StoreList from "features/StoreList"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import useSWR from "swr"
import StoreDetail from "features/StoreDetail"
import useStoreStore from "stores/useStoreStore"

const BookmarksContainer = () => {
  const placeId = useStoreStore(state => state.placeId)
  const setPlaceId = useStoreStore(state => state.setPlaceId)
  const { data } = useSWR("/user-bookmarks")

  function handleClickStore({ placeId, lat, lng }) {
    setPlaceId(placeId)
    console.log(placeId)
    // updateWithPlaceId(placeId)
    // moveTo({ latLng: { lat, lng } })
  }

  useEffect(() => {
    console.log(placeId);
  }, [placeId])

  if (placeId) {
    return (
      <Container>
        <StoreDetail
          canBack
          key={placeId}
          placeId={placeId}
          onClose={() => setPlaceId(null)}
        />
      </Container>
    )
  }
  console.log('-');

  return (
    <Container>
      <H2>你的珍藏</H2>
      <StoreList stores={data || []} onClick={handleClickStore} />
    </Container>
  )
}

const Container = styled.div`
  width: 628px;
  position: relative;
  background-color: #fcf9f6;

  @media ${devices.mobileXl} {
    width: 100%;
    z-index: 5;
  }
`

const H2 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-size: 24px;
  font-weight: 500;
  padding: 12px;
`

export default BookmarksContainer
