import { Avatar } from "@mui/material"
import RatingStars from "components/RatingStars"
import React from "react"
import styled from "styled-components"

import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"

const ReviewCard = ({
  authorName,
  rating,
  relativeTimeDescription,
  text,
}) => {
  const [showMore, setShowMore] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const pElement = useRef(null)

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  useEffect(() => {
    if (pElement.current.offsetHeight > 55) {
      setShowButton(true)
    }
    setShowMore(false)
  }, [])

  return (
    <>
      <Container>
        <Avatar>{authorName[0]}</Avatar>
        <Content>
          <h6>{authorName}</h6>
          <CreatedAtSpan>{relativeTimeDescription}</CreatedAtSpan>
          <RatingStars rating={rating} showRate={false} />
          <P showMore={showMore} ref={pElement}>
            {text}
          </P>
          {showButton && (
            <ShowMoreButton onClick={toggleShowMore}>
              {showMore ? (
                <>
                  <span>顯示更少</span>
                  <img src="/arrows/up-small.svg" alt="down-arrow" />
                </>
              ) : (
                <>
                  <span>顯示更多</span>
                  <img src="/arrows/down-small.svg" alt="down-arrow" />
                </>
              )}
            </ShowMoreButton>
          )}
        </Content>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 2rem 0;
`

const ShowMoreButton = styled.div`
  cursor: pointer;
  color: #42403f;
  text-decoration-line: underline;
  font-size: 14px;
  display: flex;
  gap: 4px;
`

const P = styled.p`
  font-size: 14px;
  line-height: 1.3em;
  white-space: pre-line;
  overflow: hidden;
  max-height: ${({ showMore }) => (showMore ? "none" : "3.9em")};
  text-overflow: ellipsis;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`

const CreatedAtSpan = styled.span`
  font-size: 12px;
  color: #222120;
  margin-bottom: 8px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    color: #222120;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h6 {
      font-size: 14px;
    }

    max-width: calc(100% - 40px);
  }
`

export default ReviewCard
