import { Divider } from "@mui/material"
import React from "react"
import { useState } from "react"
import Chooser from "./Chooser"
import NewReview from "./NewReview"
import WorkCafeReviews from "./WorkCafeReviews"
import { Container } from './styled'
import useSWR from "swr"
import Skeleton from "components/Skeleton"

const Reviews = ({ placeId, name, onSave }) => {
  const [active, setActive] = useState("workCafe")
  const { data: reviews, mutate: reviewsMutate } = useSWR(
    `/stores/${placeId}/reviews`
  )

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
      <Divider sx={{ borderWidth: 1 }} />
      <NewReview placeId={placeId} name={name} onSave={handleSave} />
      {active === 'workCafe' && (
        <>
          {reviews.reviews.map(review => (
            <WorkCafeReviews key={review.id}
              {...review}
            />
          ))}
        </>
      )}
    </Container>
  )
}

export default Reviews
