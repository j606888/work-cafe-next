import { Divider } from "@mui/material"
import React from "react"
import { useState } from "react"
import styled, { css } from "styled-components"
import Chooser from "./Chooser"
import NewReview from "./NewReview"
import WorkCafeReviews from "./WorkCafeReviews"

const Container = styled.div`
  margin: 0 56px;
  color: #757575;

  font-family: "Noto Sans", sans-serif;
`

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
