import * as React from "react"
import Card from "features/Drawer/Card"
import { useDispatch } from "react-redux"
import { updatePlaceId, updateFocusPlaceId } from "store/slices/store"
import { Container, Scrollbar } from "./styled"

export default function StoreListV2({ stores = [] }) {
  const dispatch = useDispatch()

  const handleMouseEnter = (placeId) => {
    dispatch(updateFocusPlaceId(placeId))
  }
  const handleMouseLeave = (_placeId) => {
    dispatch(updateFocusPlaceId(null))
  }
  const handleClick = (placeId) => {
    dispatch(updatePlaceId(placeId))
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
          />
        ))}
      </Scrollbar>
    </Container>
  )
}
