import React from "react"
import { useState } from "react"
import Chooser from "./Chooser"
import NewReview from "./NewReview"
import WorkCafeReviews from "./WorkCafeReviews/WorkCafeReviews"
import { Container, LeaveFirstReview } from './styled'
import useSWR from "swr"
import Skeleton from "components/Skeleton"
import GoogleReviewCard from "./GoogleReviewCard"
import useUserStore from "stores/useUserStore"
import styled from "styled-components"
import { grey01, grey04 } from "constants/color"

const Reviews = ({ placeId, name, url, onSave, googleReviews=[] }) => {
  const [active, setActive] = useState("workCafe")
  const user = useUserStore(state => state.user)
  const { data: reviews, mutate: reviewsMutate } = useSWR(
    `/stores/${placeId}/reviews`
  )
  const { data: myReview, mutate } = useSWR(user ? `/stores/${placeId}/reviews/me` : null)

  function handleActiveChange(newActive) {
    setActive(newActive)
  }

  function handleSave() {
    onSave()
    reviewsMutate()
  }

  if (!reviews) {
    return (
      <Container>
        <Skeleton />
      </Container>
    )
  }

  return (
    <Container>
      <Chooser onChange={handleActiveChange} />
      {active === "workCafe" && (
        <>
          <NewReview placeId={placeId} name={name} onSave={handleSave} />
          {reviews.reviews.map((review) => (
            <WorkCafeReviews key={review.id} {...review} />
          ))}
          {reviews.reviews.length === 0 && !myReview && (
            <LeaveFirstReview>
              <h3>還沒有人給過評論</h3>
              <p>不如你就當第一個吧！</p>
            </LeaveFirstReview>
          )}
        </>
      )}
      {active === "googleMap" && (
        <>
          {googleReviews.map((review) => (
            <GoogleReviewCard key={review.time} {...review} />
          ))}
          <LinkContainer>
            <GoogleReviewLink href={url} target="_blank">看更多Google Map評論</GoogleReviewLink>
          </LinkContainer>
        </>
      )}
    </Container>
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
export default Reviews
