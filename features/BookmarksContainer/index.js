import StoreList from "features/StoreList"
import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import useSWR from "swr"

const BookmarksContainer = () => {
  const { data } = useSWR("/user-bookmarks")

  function handleClickStore({ placeId, lat, lng }) {
    // setPlaceId(placeId)
    // updateWithPlaceId(placeId)
    // moveTo({ latLng: { lat, lng } })
  }

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
