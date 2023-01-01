import StoreList from "features/StoreList"
import React from "react"
import styled from "styled-components"
import { devices } from "constants/styled-theme"
import useSWR from "swr"
import StoreDetail from "features/StoreDetail"
import useStoreStore from "stores/useStoreStore"
import shallow from "zustand/shallow"

const BookmarksContainer = () => {
  const [placeId, setPlaceId] = useStoreStore(
    (state) => [state.placeId, state.setPlaceId],
    shallow
  )
  const { data } = useSWR("/user-bookmarks")

  function handleClickStore({ placeId }) {
    // setPlaceId(placeId)
  }

  if (placeId) {
    return (
      <Container>
        <StoreDetail
          canBack
          key={placeId}
          placeId={placeId}
          // onClose={() => setPlaceId(null)}
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
  font-size: 24px;
  font-weight: 500;
  padding: 12px;

  @media ${devices.mobileXl} {
    display: inline-block;
    font-size: 14px;
    background-color: #6d4c41;
    color: #fff;
  }
`

export default BookmarksContainer
