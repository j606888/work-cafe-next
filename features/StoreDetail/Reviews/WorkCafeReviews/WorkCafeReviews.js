import { Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import React from "react"
import ImagesWorm from "components/ImagesWorm/ImagesWorm"
import { Container, Content, EditBoxContainer } from './styled'
import { useState } from "react"
import { MoreVert } from "@mui/icons-material"


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

const WorkCafeReviews = ({
  id,
  userName,
  userAvatarUrl,
  createdAt,
  description,
  photos=[],
  editable,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  return (
    <>
      <Container>
        <Avatar alt={userName} src={userAvatarUrl} />
        <Content>
          <h6>{userName}</h6>
          <span>{_dateString(createdAt)}</span>
          <p>{description}</p>
        </Content>
        {editable && <EditBox id={id} onDelete={onDelete} onEdit={onEdit} />}
      </Container>
      <ImagesWorm images={photos} />
    </>
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
export default WorkCafeReviews
