import React from "react"
import {
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material"
import _ from "lodash"
import { Chip } from "@mui/material"
import { Container, FaceBlock, Details } from "./styled"

const ReviewsBlock = ({ reviewReport }) => {
  const {recommend, primaryTags, secondaryTags } = reviewReport

  return (
    <Container>
      <p>適合辦公</p>
      <FaceBlock>
        <div>
          <ThumbDown sx={{ color: "#EF9A9A" }} />
          <span>{recommend.no}</span>
        </div>
        <div>
          <ThumbUp sx={{ color: "#54ADDB" }} />
          <span>{recommend.yes}</span>
        </div>
      </FaceBlock>
      <p>主標籤</p>
      <Details>
        {primaryTags.map(tag => (
          <Chip key={tag.name} label={`${tag.name} (${tag.count})`} color="primary" />
        ))}
      </Details>
      <p>副標籤</p>
      <Details>
        {secondaryTags.map(tag => (
          <Chip key={tag.name} label={`${tag.name} (${tag.count})`} color="success" />
        ))}
      </Details>
    </Container>
  )
}

export default ReviewsBlock
