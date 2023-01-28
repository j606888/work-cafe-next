import * as React from "react"
import { Container, StoreCount } from "./styled"
import StoreCard from "components/StoreCard"
import NoMatch from "features/LeftContainer/NoMatch"
import useSearchStores from "hooks/useSearchStores"
import store from "stores/store"
import { useRouter } from "next/router"

export default function StoreList({ expand }) {
  const router = useRouter()
  const { data: stores } = useSearchStores()
  const { map, placeId, setPlaceId, setPanelType, focusPlaceId } = store((state) => ({
    map: state.map,
    placeId: state.placeId,
    setPlaceId: state.setPlaceId,
    setPanelType: state.setPanelType,
    focusPlaceId: state.focusPlaceId,
  }))
  const storesRef = React.useRef({})

  const handleMouseEnter = (placeId) => {
    // setBouncePlaceId(placeId)
  }
  const handleMouseLeave = (_placeId) => {
    // setBouncePlaceId(null)
  }
  const handleClick = ({ placeId, lat, lng }) => {
    setPlaceId(placeId)
    // setFocusPlaceId(placeId)
    onClick({ placeId, lat, lng })
  }

  function onClick({ placeId }) {
    const lat = map.center.lat().toFixed(6)
    const lng = map.center.lng().toFixed(6)
    const zoom = map.zoom
    const location = `@${lat},${lng},${zoom}z`

    // setPlaceId(placeId)
    // setPanelType("STORE_DETAIL")

    router.push(`/place/${placeId}/${location}`)
  }

  React.useEffect(() => {
    if (focusPlaceId && storesRef.current[focusPlaceId]) {
      storesRef.current[focusPlaceId].scrollIntoView({
        inline: "center",
        block: "center",
      })
    }
  }, [focusPlaceId])

  if (!stores) return null
  if (stores.totalStores === 0) return <NoMatch />

  return (
    <>
      <StoreCount>{stores.totalStores} 間咖啡店</StoreCount>
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
