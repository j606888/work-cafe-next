import { Avatar, Chip, Divider } from "@mui/material"
import FaceIcon from "components/FaceIcon"
import React from "react"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import { ReviewWords } from "constant/i18n"
import useTimeAgo from "hooks/useTimeAgo"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Container, InfoBox, ScoreDateBox, TagsContainer, MoreContainer } from "./styled"

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

const ReviewStoreCard = ({
  store,
  recommend,
  roomVolume,
  timeLimit,
  socketSupply,
  description,
  createdAt,
}) => {
  const timeAgo = useTimeAgo()

  return (
    <>
      <Container>
        <InfoBox>
          <Avatar
            alt={"storename"}
            sx={{ width: 36, height: 36, mr: 1.5 }}
            src={store.imageUrl}
          />
          <div className="store-info">
            <span className="name">{store.name}</span>
            <span className="address">{store.address}</span>
          </div>
        </InfoBox>
        <ScoreDateBox>
          <FaceIcon size={32} type={FACE_MAP[recommend]} />
          <span>{timeAgo(createdAt)}</span>
        </ScoreDateBox>
        <TagsContainer>
          <IconChip type="roomVolume" value={roomVolume} />
          <IconChip type="timeLimit" value={timeLimit} />
          <IconChip type="socketSupply" value={socketSupply} />
        </TagsContainer>
        <p>{description}</p>
        <MoreContainer>
          <MoreVertIcon />
        </MoreContainer>
      </Container>
      <Divider />
    </>
  )
}

export default ReviewStoreCard
