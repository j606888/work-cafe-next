import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import useSWR from "swr"
import ReviewStoreCard from "../ReviewStoreCard"
import {
  updateFocusPlaceId,
  updatePlaceId,
  updateStores,
} from "store/slices/store"

export const ListContainer = styled.div`
  height: calc(100vh - 80px - 48px);
  overflow-y: scroll;
  width: 374px;
`

const ReviewList = () => {
  const { data } = useSWR("/reviews")
  const dispatch = useDispatch()

  const handleClick = (placeId) => {
    dispatch(updatePlaceId(placeId))
  }
  const handleMouseEnter = (placeId) => {
    dispatch(updateFocusPlaceId(placeId))
  }
  const handleMouseLeave = (_placeId) => {
    dispatch(updateFocusPlaceId(null))
  }

  useEffect(() => {
    const stores = data?.reviews.map((review) => review.store)
    dispatch(updateStores(stores || []))
  }, [dispatch, data])

  return (
    <ListContainer>
      {data?.reviews.map((review) => (
        <ReviewStoreCard
          key={review.id}
          {...review}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </ListContainer>
  )
}

export default ReviewList
