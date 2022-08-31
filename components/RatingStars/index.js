import React from "react"
import styled from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import StarHalfIcon from "@mui/icons-material/StarHalf"
import StarOutlineIcon from "@mui/icons-material/StarOutline"

const Container = styled.div`
  display: inline-flex;
  align-items: center;

  span {
    margin-right: 0.5rem;
    color: #666;
  }
`

const style = {
  color: "#FABC05",
  fontSize: 18,
}

function chooseStar(limit, rating) {
  const current = rating - limit
  if (current >= 0) {
    return <StarIcon sx={style} />
  } else if (current >= -0.5) {
    return <StarHalfIcon sx={style} />
  } else {
    return <StarOutlineIcon sx={style} />
  }
}

const RatingStars = ({ rating, showRate = true }) => {
  return (
    <Container>
      {showRate && <span>{rating.toFixed(1)}</span>}
      {chooseStar(1, rating)}
      {chooseStar(2, rating)}
      {chooseStar(3, rating)}
      {chooseStar(4, rating)}
      {chooseStar(5, rating)}
    </Container>
  )
}

export default RatingStars
