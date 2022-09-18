import { Avatar, Chip, Divider } from "@mui/material"
import React from "react"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import { ReviewWords } from "constant/i18n"
import useTimeAgo from "hooks/useTimeAgo"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {
  Container,
  InfoBox,
  ScoreDateBox,
  TagsContainer,
  MoreContainer,
} from "./styled"
import FaceIconGroup from "components/FaceIconGroup"

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
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const timeAgo = useTimeAgo()

  const handleClick = () => {
    onClick(store.placeId)
  }
  const handleMouseEnter = () => {
    onMouseEnter(store.placeId)
  }
  const handleMouseLeave = () => {
    onMouseLeave(store.placeId)
  }

  return (
    <>
      <Container
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
          <FaceIconGroup mood={FACE_MAP[recommend]} />
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
