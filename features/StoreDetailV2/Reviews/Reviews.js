import { Divider } from "@mui/material"
import React from "react"
import { useState } from "react"
import Chooser from "./Chooser"
import NewReview from "./NewReview"
import WorkCafeReviews from "./WorkCafeReviews"
import { Container } from './styled'

const Reviews = ({ placeId, name, onSave }) => {
  const [active, setActive] = useState("workCafe")

  function handleActiveChange(newActive) {
    setActive(newActive)
  }

  return (
    <Container>
      <Chooser onChange={handleActiveChange} />
      <Divider sx={{ borderWidth: 1 }} />
      <NewReview placeId={placeId} name={name} onSave={onSave} />
      {active === 'workCafe' && (
        <>
          <WorkCafeReviews />
          <WorkCafeReviews />
          <WorkCafeReviews />
        </>
      )}
    </Container>
  )
}

export default Reviews
