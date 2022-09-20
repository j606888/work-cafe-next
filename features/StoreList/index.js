import * as React from "react"
import Card from "features/Drawer/Card"
import { Container, Scrollbar } from "./styled"
import useStoreStore from "hooks/useStoreStore"

export default function StoreList({ stores = [] }) {
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
  }

  if (stores.length === 0) {
    return null
  }

  return (
    <Container>
      <div className="white-box"></div>
      <Scrollbar>
        {stores.map((store) => (
          <Card
            key={store.placeId}
            {...store}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            focus={store.placeId === placeId}
          />
        ))}
      </Scrollbar>
    </Container>
  )
}
