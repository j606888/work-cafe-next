import { Badge, ListItemIcon, Menu, MenuItem } from "@mui/material"
import React from "react"
import styled from "styled-components"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FlagIcon from "@mui/icons-material/Flag"
import ListIcon from "@mui/icons-material/List"
import AddIcon from "@mui/icons-material/Add"
import NewBookmarkForm from "features/BookmarkList/NewBookmarkForm"
import { saveBookmarkStore, unSaveBookmarkStore } from "api/bookmark"
import Snackbar from "components/Snackbar"
import useAuthCheck from "hooks/useAuthCheck"
import { useEffect } from "react"

const Title = styled.div`
  font-weight: 500;
  padding: 0.5rem 1rem;
  margin-bottom: 0.2rem;
`

const CATEGORIES = {
  favorite: {
    color: "#FB507D",
    icon: <FavoriteIcon fontSize="small" />,
  },
  interest: {
    color: "#34A854",
    icon: <FlagIcon fontSize="small" />,
  },
  custom: {
    color: "#4FC3F7",
    icon: <ListIcon fontSize="small" />,
  },
  add: {
    color: "#72A1F6",
    icon: <AddIcon fontSize="small" />,
  },
}

const Bookmark = ({
  isSaved = false,
  category = "custom",
  name,
  randomKey,
  onClick = () => {},
}) => {
  const info = CATEGORIES[category]

  const handleClick = () => {
    onClick({ isSaved, randomKey, name })
  }

  return (
    <MenuItem
      onClick={handleClick}
      sx={{ backgroundColor: isSaved ? "#E1EBFC" : null }}
    >
      <ListItemIcon sx={{ color: info.color }}>
        <Badge color="primary" variant="dot" invisible={!isSaved}>
          {info.icon}
        </Badge>
      </ListItemIcon>
      {name}
    </MenuItem>
  )
}

const Bookmarks = ({
  placeId,
  anchorEl,
  bookmarks = [],
  onClose = () => {},
  onSubmit = () => {},
}) => {
  const [openNewForm, setOpenNewForm] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState(false)
  const authCheck = useAuthCheck()
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (anchorEl) authCheck()
  }, [anchorEl, authCheck])

  const handleSubmit = () => {
    onSubmit()
  }

  const handleClick = async ({ isSaved, randomKey, name }) => {
    if (isSaved) {
      await unSaveBookmarkStore({ placeId, randomKey })
      setSnackbar(`從「${name}」移除`)
    } else {
      await saveBookmarkStore({ placeId, randomKey })
      setSnackbar(`新增至「${name}」`)
    }

    onSubmit()
  }

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <Title>儲存至清單中</Title>
        {bookmarks.map((bookmark) => (
          <Bookmark
            key={bookmark.randomKey}
            {...bookmark}
            onClick={handleClick}
          />
        ))}
        <Bookmark
          isSaved={false}
          category="add"
          name="新增清單"
          onClick={() => setOpenNewForm(true)}
        />
      </Menu>
      <NewBookmarkForm
        open={openNewForm}
        onClose={() => setOpenNewForm(false)}
        onSubmit={handleSubmit}
      />
      {snackbar && <Snackbar onClose={() => setSnackbar(false)} 
        message={snackbar}
      />}
    </>
  )
}

export default Bookmarks
