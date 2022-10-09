import * as React from "react"
import Card from "features/Drawer/Card"
import { Container } from "./styled"
import useStoreStore from "stores/useStoreStore"
import StoreCard from "components/StoreCard"

export default function StoreList({ stores = [], onClick=() => {} }) {
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const placeId = useStoreStore((state) => state.placeId)
  const setBouncePlaceId = useStoreStore((state) => state.setBouncePlaceId)

  const handleMouseEnter = (placeId) => {
    setBouncePlaceId(placeId)
  }
  const handleMouseLeave = (_placeId) => {
    setBouncePlaceId(null)
  }
  const handleClick = (placeId) => {
    setPlaceId(placeId)
    onClick(placeId)
  }

  if (stores.length === 0) {
    return null
  }

  return (
    <Container>
      {stores.map((store) => (
        <StoreCard
          key={store.placeId}
          images={store.photos}
          shortAddress={store.address}
          reviewsCount={store.userRatingsTotal}
          {...store}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          focus={store.placeId === placeId}
        />
      ))}
    </Container>
  )
}
