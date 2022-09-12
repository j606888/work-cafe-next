import React from 'react'
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"

const FaceIcon = ({ size, type }) => {
  if (type === 'happy') {
    return <HappyFace sx={{ fontSize: size, color: '#00897B' }}/>
  } else if (type === 'normal') {
    return <NormalFace sx={{ fontSize: size, color: '#FFC107' }}/>
  } else {
    return <BadFace sx={{ fontSize: size, color: '#E53935' }}/>
  }
}

export default FaceIcon
