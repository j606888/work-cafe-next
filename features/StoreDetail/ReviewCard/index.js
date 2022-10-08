import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import React, { useState } from "react"
import { Container, FaceContainer } from "./styled"
import useTimeAgo from "hooks/useTimeAgo"
import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import FaceIcon from "components/FaceIcon"

const FACE_MAP = {
  yes: "happy",
  normal: "normal",
  no: "bad",
}

const ReviewCard = ({
  userName,
  userAvatarUrl,
  recommend,
  description,
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

  if (!description) return null

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
          <FaceIcon type={FACE_MAP[recommend]} active />
          <span>{timeAgo(createdAt)}</span>
        </FaceContainer>
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
