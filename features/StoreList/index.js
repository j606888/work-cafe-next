import * as React from "react"
import StoreCard from "components/StoreCard"
import NoMatch from "features/StoreList/NoMatch"
import useSearchStores from "hooks/useSearchStores"
import store from "stores/store"
import useUpdateURL from "hooks/useUpdateURL"
import { useMediaQuery } from "@mui/material"
import styled, { css } from "styled-components"

export default function StoreList() {
  const { setCenterWithPlaceIdToURL } = useUpdateURL()
  const fullScreen = useMediaQuery('(max-width: 720px)')
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

export const Container = styled.div`
  /* min-height: 240px; */
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 28px;
  flex-shrink: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ expand }) => (expand ? mobileStyle.expand : mobileStyle.unExpand)}
  }
`

export const StoreCount = styled.p`
  padding: 0 45px;
  font-size: 16px;
  font-weight: 400;
  color: #222120;
  margin-top: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`


const mobileStyle = {
  expand: css`
    width: 100%;
    background-color: #ffffff;
    padding: 0 24px;
  `,
  unExpand: css`
    flex-wrap: initial;
    justify-content: flex-start;
    width: 100%;
    overflow-x: scroll;
    padding: 12px 12px;
    gap: 10px;
    background-color: #ffffff;
  `,
}
