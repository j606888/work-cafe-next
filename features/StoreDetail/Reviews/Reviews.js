import { Divider } from "@mui/material"
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

const Reviews = ({ placeId, name, onSave, googleReviews=[] }) => {
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
      <NewReview placeId={placeId} name={name} onSave={handleSave} />
      {active === 'workCafe' && (
        <>
          {reviews.reviews.map(review => (
            <WorkCafeReviews key={review.id}
              {...review}
            />
          ))}
          {reviews.reviews.length === 0 && !myReview && (
            <LeaveFirstReview>
              <h3>還沒有人給過評論</h3>
              <p>不如你就當第一個吧！</p>
            </LeaveFirstReview>
          )}
        </>
      )}
      {
        active === 'googleMap' && (
          <>
            {googleReviews.map(review => (
              <GoogleReviewCard key={review.time} {...review }/>
            ))}
          </>
        )
      }
    </Container>
  )
}

export default Reviews
