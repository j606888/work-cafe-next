import React from "react"
import styled from "styled-components"
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"
import _ from "lodash"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

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

const MoreInfoButton = styled.div`
  margin-top: 0.5rem;
  color: #1b72e8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-size: 14px;
  }
`

const ReviewsBlock = ({ reviewReport }) => {
  const [showMore, setShowMore] = React.useState(false)
  const recommend = reviewReport.recommend
  

  return (
    <Container>
      <FaceBlock>
        <div>
          <BadFace sx={{ color: "#E53935" }} />
          <span>{recommend.no}</span>
        </div>
        <div>
          <NormalFace sx={{ color: "#FFC107" }} />
          <span>{recommend.normal}</span>
        </div>
        <div>
          <HappyFace sx={{ color: "#00897B" }} />
          <span>{recommend.yes}</span>
        </div>
      </FaceBlock>
      <MoreInfoButton onClick={() => setShowMore(cur => !cur)}>
        <span>詳細資訊</span>
        {showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </MoreInfoButton>
    </Container>
  )
}

export default ReviewsBlock
