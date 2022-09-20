import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ReviewStoreCard from "../ReviewStoreCard"
import useStoreStore from "hooks/useStoreStore"
import useScrollFetch from "hooks/useScrollFetch"

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
  const setStores = useStoreStore((state) => state.setStores)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const setBouncePlaceId = useStoreStore((state) => state.setBouncePlaceId)
  const { data, handleScroll } = useScrollFetch(getKey)

  const handleClick = (placeId) => {
    setPlaceId(placeId)
  }
  const handleMouseEnter = (placeId) => {
    setBouncePlaceId(placeId)
  }
  const handleMouseLeave = (_placeId) => {
    setBouncePlaceId(null)
  }

  let reviewsArr = []

  data?.forEach(({ reviews }) => {
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

    setStores(stores || [])
  }, [data])

  if (!reviewsArr) return "loading"

  return (
    <ListContainer onScroll={handleScroll}>
      {reviewsArr?.map((review) => (
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
