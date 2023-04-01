import { Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import React from "react"
import ImagesWorm from "components/ImagesWorm/ImagesWorm"
import { useState } from "react"
import { MoreVert } from "@mui/icons-material"
import styled from "styled-components"

import TagList from "components/TagList/TagList"
import DeleteConfirmDialog from "./DeleteConfirmDialog"

const EditBox = ({ onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = () => {
    onDelete()
    setAnchorEl(null)
  }
  const openConfirmDialog = () => {
    setAnchorEl(null)
    setOpenDeleteConfirm(true)
  }

  return (
    <EditBoxContainer>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={openConfirmDialog}>刪除</MenuItem>
      </Menu>
      <DeleteConfirmDialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        onDelete={handleDelete}
      />
    </EditBoxContainer>
  )
}

const ICON_MAP = {
  yes: "/v2/thumb-up-green.svg",
  no: "/v2/thumb-down-black.svg",
}

const ReviewCard = ({
  id,
  userName,
  userAvatarUrl,
  createdAt,
  description,
  visitDay,
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
        {userAvatarUrl ? (
          <Avatar alt={userName} src={userAvatarUrl} />
        ) : (
          <img src="/guests/guest.svg" alt="guest" />
        )}
        <Content>
          <h6>{userName}</h6>
          <span>{_dateString(createdAt, visitDay)}</span>
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

function _dateString(timestamp, visitDay) {
  const time = new Date(timestamp * 1000)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const isWeekend = visitDay === "weekend" ? "週末造訪" : "平日造訪"

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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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

export default ReviewCard
