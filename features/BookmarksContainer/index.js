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
  }

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

  return (
    <Container>
      <H2>我的珍藏</H2>
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
    background: none;
  }
`

const H2 = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-size: 24px;
  font-weight: 500;
  padding: 12px;

  @media ${devices.mobileXl} {
    display: inline-block;
    font-size: 14px;
    background-color: #6D4C41;
    color: #fff;
  }
`

export default BookmarksContainer
