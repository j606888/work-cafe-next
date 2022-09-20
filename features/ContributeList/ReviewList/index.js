import React, { useEffect } from "react"
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
  const { data, handleScroll } = useScrollFetch(getKey)

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
  }, [data, setStores])

  if (!reviewsArr) return "loading"

  return (
    <ListContainer onScroll={handleScroll}>
      {reviewsArr?.map((review) => (
        <ReviewStoreCard
          key={review.id}
          {...review}
        />
      ))}
    </ListContainer>
  )
}

export default ReviewList
