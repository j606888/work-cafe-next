import React from 'react'
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material"

const ACTIVE_COLOR = {
  happy: "#A5D6A7",
  normal: "#FFD54F",
  bad: "#EF9A9A",
}

const FaceIcon = ({ size, type, active=false }) => {
  const color = active ? ACTIVE_COLOR[type] : "#ccc"

  if (type === 'happy') {
    return <ThumbUp sx={{ fontSize: size, color: color }}/>
  } else if (type === 'normal') {
    return <NormalFace sx={{ fontSize: size, color: color }}/>
  } else {
    return <ThumbDown sx={{ fontSize: size, color: color }}/>
  }
}

export default FaceIcon
