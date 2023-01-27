import { Avatar, Divider, IconButton, Menu, MenuItem } from "@mui/material"
import React from "react"
import ImagesWorm from "components/ImagesWorm/ImagesWorm"
import { useState } from "react"
import { MoreVert } from "@mui/icons-material"
import styled from "styled-components"
import { devices } from "constants/styled-theme"
import TagList from "components/TagList/TagList"

const EditBox = ({ onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleEdit = () => {
    onEdit()
    setAnchorEl(null)
  }
  const handleDelete = () => {
    onDelete()
    setAnchorEl(null)
  }

  return (
    <EditBoxContainer>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>編輯</MenuItem>
        <MenuItem onClick={handleDelete}>刪除</MenuItem>
      </Menu>
    </EditBoxContainer>
  )
}

const ICON_MAP = {
  yes: "/thumb-up.svg",
  no: "/thumb-down.svg",
}

const WorkCafeReviews = ({
  id,
  userName,
  userAvatarUrl,
  createdAt,
  description,
  photos = [],
  editable,
  recommend,
  primaryTags = [],
  onDelete = () => {},
  onEdit = () => {},
}) => {
  return (
    <Container>
      <UserInfo>
        {userName ? (
          <img src="/guest.svg" alt="guest" />
        ) : (
          <Avatar alt={userName} src={userAvatarUrl} />
        )}
        <Content>
          <h6>{userName}</h6>
          <span>{_dateString(createdAt)}</span>
          <TagDiv>
            <img
              src={ICON_MAP[recommend]}
              alt={recommend}
              width={36}
              height={36}
            />
            <TagList tags={primaryTags} withCount={false} />
          </TagDiv>
          <p>{description}</p>
          <ImagesWorm images={photos} />
        </Content>
        {editable && <EditBox id={id} onDelete={onDelete} onEdit={onEdit} />}
      </UserInfo>
    </Container>
  )
}

function _dateString(timestamp) {
  const time = new Date(timestamp * 1000)
  const year = time.getFullYear()
  const month = time.getMonth()
  const date = time.getDate()
  const day = time.getDay()
  const isWeekend = [5, 6].includes(day) ? "週末造訪" : "平日造訪"

  return `${year}年${month}月${date}日・${isWeekend}`
}

const Container = styled.div`
  margin-bottom: 2rem;
`

const TagDiv = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
`

const UserInfo = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    color: #222120;
  }

  span {
    font-size: 12px;
    color: #222120;
  }

  p {
    font-size: 14px;
    white-space: pre-line;
    color: #42403f;
    margin-bottom: 0;
  }

  @media ${devices.mobileXl} {
    h6 {
      font-size: 14px;
    }

    span {
      font-size: 10px;
    }

    p {
      font-size: 12px;
    }

    max-width: calc(100% - 40px);
  }
`

const EditBoxContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export default WorkCafeReviews
