import React from 'react'
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"

const ACTIVE_COLOR = {
  happy: "#00897B",
  normal: "#FFC107",
  bad: "#E53935",
}

const FaceIcon = ({ size, type, active=false }) => {
  const color = active ? ACTIVE_COLOR[type] : "#ccc"

  if (type === 'happy') {
    return <HappyFace sx={{ fontSize: size, color: color }}/>
  } else if (type === 'normal') {
    return <NormalFace sx={{ fontSize: size, color: color }}/>
  } else {
    return <BadFace sx={{ fontSize: size, color: color }}/>
  }
}

export default FaceIcon
