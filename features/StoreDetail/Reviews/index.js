import React from "react"
import { useState } from "react"
import Chooser from "./Chooser"
import styled from "styled-components"
import WorkCafeReviews from "./WorkCafeReviews"
import GoogleMapReviews from "./GoogleMapReviews"
import { devices } from "constants/styled-theme"

const Reviews = ({ placeId }) => {
  const [active, setActive] = useState("workCafe")

  function handleActiveChange(newActive) {
    setActive(newActive)
  }

  return (
    <Container>
      <Chooser onChange={handleActiveChange} />
      {active === "workCafe" ? (
        <WorkCafeReviews placeId={placeId} />
      ) : (
        <GoogleMapReviews placeId={placeId} />
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: 0 42px 42px;
  color: #757575;

  @media ${devices.mobileXl} {
    margin: 0 24px;
  }
`

export default Reviews
