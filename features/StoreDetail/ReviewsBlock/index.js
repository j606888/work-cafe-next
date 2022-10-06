import React from "react"
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"
import _ from "lodash"
import { Divider } from "@mui/material"
import ProgressLabel from "components/ProgressLabel"
import { Container, FaceBlock, DetailContainer, Details } from "./styled"
import { ReviewWords } from "constant/i18n"

const DetailPart = ({ name, en, scores = {} }) => {
  const highestScore = Math.max(..._.values(scores))
  const keys = _.keys(scores)

  const bars = keys.map((key) => {
    const value = scores[key]
    let percentage = 0
    if (value !== 0) {
      percentage = (value / highestScore) * 100
    }

    return (
      <ProgressLabel
        key={key}
        label={ReviewWords[en][key]}
        number={value}
        percentage={percentage}
      />
    )
  })

  return (
    <DetailContainer>
      <span>{name}</span>
      <div>{bars}</div>
    </DetailContainer>
  )
}

const ReviewsBlock = ({ reviewReport }) => {
  const recommend = reviewReport.recommend

  return (
    <Container>
      <p>適合安靜做事</p>
      <FaceBlock>
        <div>
          <BadFace sx={{ color: "#EF9A9A" }} />
          <span>{recommend.no}</span>
        </div>
        <div>
          <NormalFace sx={{ color: "#FFD54F" }} />
          <span>{recommend.normal}</span>
        </div>
        <div>
          <HappyFace sx={{ color: "#A5D6A7" }} />
          <span>{recommend.yes}</span>
        </div>
      </FaceBlock>
      <Details>
        <DetailPart
          name="音量"
          en="roomVolume"
          scores={reviewReport.roomVolume}
        />
        <Divider />
        <DetailPart
          name="限時"
          en="timeLimit"
          scores={reviewReport.timeLimit}
        />
        <Divider />
        <DetailPart
          name="插座"
          en="socketSupply"
          scores={reviewReport.socketSupply}
        />
      </Details>
    </Container>
  )
}

export default ReviewsBlock
