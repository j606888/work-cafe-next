import * as React from "react"
import { Container, StoreCount } from "./styled"
import StoreCard from "components/StoreCard"
import NoMatch from "features/StoreList/NoMatch"
import useSearchStores from "hooks/useSearchStores"
import store from "stores/store"
import useUpdateURL from "hooks/useUpdateURL"

export default function StoreList({ expand }) {
  const { setCenterWithPlaceIdToURL } = useUpdateURL()
  const { data: stores } = useSearchStores()
  const {
    map,
    placeId,
    setPlaceId,
    focusPlaceId,
    setFocusPlaceId,
    setBouncePlaceId,
  } = store((state) => ({
    map: state.map,
    placeId: state.placeId,
    setPlaceId: state.setPlaceId,
    focusPlaceId: state.focusPlaceId,
    setFocusPlaceId: state.setFocusPlaceId,
    setBouncePlaceId: state.setBouncePlaceId,
  }))
  const storesRef = React.useRef({})

  const handleMouseEnter = (placeId) => {
    setBouncePlaceId(placeId)
  }
  const handleMouseLeave = (_placeId) => {
    setBouncePlaceId(null)
  }
  const handleClick = ({ placeId, lat, lng }) => {
    setPlaceId(placeId)
    setBouncePlaceId(null)
    map.panTo({
      lat,
      lng,
    })
    onClick({ placeId, lat, lng })
  }

  function onClick({ placeId }) {
    setFocusPlaceId(placeId)
    setPlaceId(placeId)
    setCenterWithPlaceIdToURL(placeId)
  }

  React.useEffect(() => {
    if (focusPlaceId && storesRef.current[focusPlaceId]) {
      storesRef.current[focusPlaceId].scrollIntoView({
        inline: "center",
        block: "center",
      })
    }
  }, [focusPlaceId])

  // if (!stores) return null
  if (stores?.totalStores === 0) return <NoMatch />

  return (
    <>
      {/* <StoreCount>{stores?.totalStores} 間咖啡店</StoreCount> */}
      <Container expand={expand}>
        {stores?.stores?.map((store, i) => (
          <StoreCard
            ref={(el) => (storesRef.current[store.placeId] = el)}
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
