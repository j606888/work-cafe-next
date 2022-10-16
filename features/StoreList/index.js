import * as React from "react"
import { Container, StoreCount } from "./styled"
import useStoreStore from "stores/useStoreStore"
import StoreCard from "components/StoreCard"

export default function StoreList({ stores = [], onClick = () => {} }) {
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const placeId = useStoreStore((state) => state.placeId)
  const setBouncePlaceId = useStoreStore((state) => state.setBouncePlaceId)
  const storesRef = React.useRef([])

  React.useEffect(() => {
    storesRef.current = storesRef.current.slice(0, stores.length)
  }, [stores])

  const handleMouseEnter = (placeId) => {
    setBouncePlaceId(placeId)
  }
  const handleMouseLeave = (_placeId) => {
    setBouncePlaceId(null)
  }
  const handleClick = ({ placeId, lat, lng }) => {
    console.log(storesRef)
    storesRef.current[30].scrollIntoView({
      behavior: 'smooth'
    })
    // setPlaceId(placeId)
    // onClick({ placeId, lat, lng })
  }

  if (stores.length === 0) {
    return null
  }

  return (
    <>
      <StoreCount>{stores.length} 間咖啡店</StoreCount>
      <Container>
        {stores.map((store, i) => (
          <StoreCard
            ref={el => storesRef.current[i] = el}
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
