import React from 'react'
import styled from 'styled-components'
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"
import _ from 'lodash'

const Container = styled.div`
  padding: 1rem 1.5rem;
`

const FaceBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    svg {
      font-size: 48px;
    }

    span {
      font-size: 24px;
      font-weight: 500;
    }
  }
`

const countFace = (reviews, recommend) => {
  return _.filter(reviews, (review) => review.recommend === recommend).length
}

const ReviewsBlock = ({ reviews = []}) => {
  const badCount = countFace(reviews, 'no')
  const normalCount = countFace(reviews, 'normal')
  const goodCount = countFace(reviews, 'yes')

  return (
    <Container>
      <FaceBlock>
        <div>
          <BadFace sx={{ color: '#E53935'}}/>
          <span>{badCount}</span>
        </div>
        <div>
          <NormalFace sx={{ color: '#FFC107'}} />
          <span>{normalCount}</span>
        </div>
        <div>
          <HappyFace sx={{ color: '#00897B'}}/>
          <span>{goodCount}</span>
        </div>
      </FaceBlock>
    </Container>
  )
}

export default ReviewsBlock
