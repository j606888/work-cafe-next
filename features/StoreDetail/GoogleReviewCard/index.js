import { Avatar, Divider } from "@mui/material"
import RatingStars from "components/RatingStars"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 1rem 1.5rem 0;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    span {
      font-size: 14px;
    }
  }

  .rating {
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
      font-size: 14px;
      color: #666;
    }
  }

  p {
    white-space: pre-line;
    margin-top: 0.5rem;
    font-size: 14px;
    line-height: 150%;
  }
`

const GoogleReviewCard = ({ authorName, authorUrl, rating, relativeTimeDescription, text }) => {
  return (
    <>
      <Container>
        <div className="user-info">
          <Avatar
            alt={authorName}
            sx={{ width: 28, height: 28, mr: 1.5 }}
            src={authorUrl}
          />
          <span>{authorName}</span>
        </div>
        <div className="rating">
          <RatingStars rating={rating} showRate={false} />
          <span>{relativeTimeDescription}</span>
        </div>
        <p>{text}</p>
      </Container>
      <Divider />
    </>
  )
}

export default GoogleReviewCard
