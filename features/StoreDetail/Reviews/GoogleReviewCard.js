import { Avatar } from "@mui/material"
import RatingStars from "components/RatingStars"
import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"


const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 2rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  span {
    font-size: 12px;
  }

  p {
    font-size: 14px;
    white-space: pre-line;
  }

  @media ${devices.mobileXl} {
    h6 {
      font-size: 14px;
    }

    span {
      font-size: 10px;
    }

    p {
      font-size: 12px;
    }

    max-width: calc(100% - 40px);
  }
`

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const GoogleReviewCard = ({
  authorName,
  authorUrl,
  rating,
  relativeTimeDescription,
  text,
}) => {
  return (
    <>
      <Container>
        <Avatar>{authorName[0]}</Avatar>
        <Content>
          <Main>
            <h6>{authorName}</h6>
            <RatingStars rating={rating} showRate={false} />
          </Main>
          <span>{relativeTimeDescription}</span>
          <p>{text}</p>
        </Content>
      </Container>
    </>
  )
}

export default GoogleReviewCard
