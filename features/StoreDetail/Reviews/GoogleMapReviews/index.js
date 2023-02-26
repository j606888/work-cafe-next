import { grey01, grey04 } from "constants/color"
import React from "react"
import styled from "styled-components"
import useSWR from "swr"
import ReviewCard from "./ReviewCard"

const GoogleMapReviews = ({ placeId }) => {
  const { data: store } = useSWR(`/stores/${placeId}`)

  if (!store) return null

  return (
    <>
      {store.reviews.map((review) => (
        <ReviewCard key={review.time} {...review} />
      ))}
      <LinkContainer>
        <GoogleReviewLink href={store.url} target="_blank">
          看更多Google Map評論
        </GoogleReviewLink>
      </LinkContainer>
    </>
  )
}

const LinkContainer = styled.div`
  text-align: center;
  margin-bottom: 64px;
`

const GoogleReviewLink = styled.a`
  margin: 0 auto;
  display: inline-block;
  border: 1px solid ${grey04};
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.04));
  border-radius: 12px;
  padding: 11px 21px;
  color: ${grey01};
  text-decoration: none;
`

export default GoogleMapReviews
