import * as React from "react"
import { Container, StoreCount } from "./styled"
import StoreCard from "components/StoreCard"
import NoMatch from "features/StoreList/NoMatch"
import useSearchStores from "hooks/useSearchStores"
import store from "stores/store"
import useUpdateURL from "hooks/useUpdateURL"
import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"

export default function StoreList() {
  const { setCenterWithPlaceIdToURL } = useUpdateURL()
  const fullScreen = useMediaQuery(devices.mobileXl)
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
  const [showBorder, setShowBorder] = React.useState(true)
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
    map.setZoom(17)
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

    // Tricky way to remove focusPlaceId when clicking "Go back"
    if (!placeId && !fullScreen) {
      setFocusPlaceId(null)
    }
  }, [focusPlaceId, fullScreen])

  // if (!stores) return null
  if (stores?.totalStores === 0) return <NoMatch />

  return (
    <>
      {/* <StoreCount>{stores?.totalStores} 間咖啡店</StoreCount> */}
      <Container>
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
