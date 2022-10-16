import * as React from "react"
import { Container, StoreCount } from "./styled"
import useStoreStore from "stores/useStoreStore"
import StoreCard from "components/StoreCard"

export default function StoreList({ stores = [], onClick = () => {} }) {
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const placeId = useStoreStore((state) => state.placeId)
  const focusPlaceId = useStoreStore((state) => state.focusPlaceId)
  const setFocusPlaceId = useStoreStore((state) => state.setFocusPlaceId)
  const setBouncePlaceId = useStoreStore((state) => state.setBouncePlaceId)
  const storesRef = React.useRef({})

  const handleMouseEnter = (placeId) => {
    setBouncePlaceId(placeId)
  }
  const handleMouseLeave = (_placeId) => {
    setBouncePlaceId(null)
  }
  const handleClick = ({ placeId, lat, lng }) => {
    setPlaceId(placeId)
    setFocusPlaceId(placeId)
    onClick({ placeId, lat, lng })
  }

  React.useEffect(() => {
    if (focusPlaceId && storesRef.current[focusPlaceId]) {
      storesRef.current[focusPlaceId].scrollIntoView(
        { inline: 'start' }
      )
    }
  }, [focusPlaceId])

  if (stores.length === 0) {
    return null
  }

  return (
    <>
      <StoreCount>{stores.length} 間咖啡店</StoreCount>
      <Container>
        {stores.map((store, i) => (
          <StoreCard
            ref={el => storesRef.current[store.placeId] = el}
            key={store.placeId}
            images={store.photos}
            shortAddress={store.address}
            reviewsCount={store.recommendCount}
            {...store}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            focus={store.placeId === placeId}
          />
        ))}
      </Container>
    </>
  )
}
