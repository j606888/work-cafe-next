import React from "react"
import styled from "styled-components"
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LockIcon from "@mui/icons-material/Lock"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FlagIcon from "@mui/icons-material/Flag"
import ListIcon from "@mui/icons-material/List"

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  & > :last-child {
    margin-left: auto;
  }

  .description {
    margin-left: 1.2rem;
    font-size: 14px;

    .is-private {
      margin-top: 2px;
      color: #818181;
      font-size: 8px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`

const CATEGORIES = {
  favorite: (
    <Avatar sx={{ bgcolor: "#FB507D" }}>
      <FavoriteIcon />
    </Avatar>
  ),
  interest: (
    <Avatar sx={{ bgcolor: "#34A854" }}>
      <FlagIcon />
    </Avatar>
  ),
  custom: (
    <Avatar sx={{ bgcolor: "#4FC3F7" }}>
      <ListIcon />
    </Avatar>
  ),
}

const Bookmark = ({
  randomKey,
  category,
  name,
  onClick = () => {},
  onDelete = () => {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const icon = CATEGORIES[category]

  const handleOpenMenu = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => {
    onClick(randomKey)
  }

  const handleDelete = () => {
    onDelete(randomKey)
  }

  return (
    <>
      <Container onClick={handleClick}>
        {icon}
        <div className="description">
          <span>{name}</span>
          <div className="is-private">
            <LockIcon sx={{ fontSize: 12 }} />
            <span>私人</span>
          </div>
        </div>
        <Tooltip
          title="更多選項"
          placement="bottom-start"
          onClick={handleOpenMenu}
        >
          <MoreVertIcon sx={{ color: "#666" }} />
        </Tooltip>
      </Container>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem>編輯清單</MenuItem>
        <MenuItem>分享清單</MenuItem>
        {category === "custom" && (
          <MenuItem onClick={handleDelete}>刪除</MenuItem>
        )}
      </Menu>
    </>
  )
}

export default Bookmark
