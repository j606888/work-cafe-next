import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import useSWRInfinite from "swr/infinite"
import ReviewStoreCard from "../ReviewStoreCard"
import {
  updateFocusPlaceId,
  updatePlaceId,
} from "store/slices/store"
import { Button } from "@mui/material"
import useStoreStore from "hooks/useStoreStore"

export const ListContainer = styled.div`
  height: calc(100vh - 80px - 48px);
  overflow-y: scroll;
  width: 374px;
`

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.reviews.length) return null
  return `/reviews?page=${pageIndex + 1}&per=10`
}

const ReviewList = () => {
  const clearStores = useStoreStore(state => state.clearStores)
  const setStores = useStoreStore(state => state.setStores)
  const { data, size, setSize } = useSWRInfinite(getKey)
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

  let reviewsArr = []

  data?.forEach(({ paging, reviews }) => {
    reviews.forEach((review) => {
      reviewsArr.push(review)
    })
  })

  useEffect(() => {
    let stores = []

    data?.forEach(({ reviews }) => {
      reviews.forEach((review) => {
        stores.push(review.store)
      })
    })

    if (stores.length > 0) {
      setStores(stores)
    } else {
      clearStores()
    }
  }, [dispatch, data])

  if (!reviewsArr) return "loading"

  return (
    <ListContainer>
      {reviewsArr?.map((review) => (
        <ReviewStoreCard
          key={review.id}
          {...review}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      <Button onClick={() => setSize(size + 1)}>Load More</Button>
    </ListContainer>
  )
}

export default ReviewList
