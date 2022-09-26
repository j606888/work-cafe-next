import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import React, { useState } from "react"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import { Container, FaceContainer, TagsContainer } from "./styled"
import { ReviewWords } from "constant/i18n"
import FaceIconGroup from "components/FaceIconGroup"
import useTimeAgo from "hooks/useTimeAgo"
import { MoreVert as MoreVertIcon } from "@mui/icons-material"

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
  createdAt,
  noDivider = false,
  isOwner = false,
  onDelete = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const timeAgo = useTimeAgo()

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

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
        </div>
        <FaceContainer>
          <FaceIconGroup mood={FACE_MAP[recommend]} />
          <span>{timeAgo(createdAt)}</span>
        </FaceContainer>
        <TagsContainer>
          <IconChip type="roomVolume" value={roomVolume} />
          <IconChip type="timeLimit" value={timeLimit} />
          <IconChip type="socketSupply" value={socketSupply} />
        </TagsContainer>
        <p>{description}</p>
        {isOwner && (
          <>
            <IconButton
              sx={{ position: "absolute", top: 0, right: 10 }}
              onClick={handleOpenMenu}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem onClick={onDelete}>刪除評論</MenuItem>
            </Menu>
          </>
        )}
      </Container>
      {!noDivider && <Divider />}
    </>
  )
}

export default ReviewCard
