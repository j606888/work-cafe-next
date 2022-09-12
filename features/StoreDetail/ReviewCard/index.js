import { Avatar, Chip, Divider } from "@mui/material"
import React from "react"
import FaceIcon from "components/FaceIcon"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import { Container, FaceContainer, TagsContainer } from "./styled"
import { ReviewWords } from 'constant/i18n'

const FACE_MAP = {
  yes: "happy",
  normal: "normal",
  no: "bad",
}

const ICON_MAP = {
  roomVolume: <VolumeUpIcon />,
  timeLimit: <AccessAlarmIcon />,
  socketSupply: <ElectricalServicesIcon />,
}

const IconChip = ({ type, value }) => {
  if (!value) return null
  const label = ReviewWords[type][value]

  return (
    <Chip icon={ICON_MAP[type]} label={label} variant="outlined" size="small" />
  )
}

const ReviewCard = ({
  userName,
  userAvatarUrl,
  recommend,
  description,
  roomVolume,
  timeLimit,
  socketSupply,
}) => {
  return (
    <>
      <Container>
        <div className="user-info">
          <Avatar
            alt={"authorName"}
            sx={{ width: 28, height: 28, mr: 1.5 }}
            src={userAvatarUrl}
          />
          <span>{userName}</span>
          <FaceContainer>
            <FaceIcon size={48} type={FACE_MAP[recommend]} />
          </FaceContainer>
        </div>
        <TagsContainer>
          <IconChip type="roomVolume" value={roomVolume} />
          <IconChip type="timeLimit" value={timeLimit} />
          <IconChip type="socketSupply" value={socketSupply} />
        </TagsContainer>
        <p>{description}</p>
      </Container>
      <Divider />
    </>
  )
}

export default ReviewCard
