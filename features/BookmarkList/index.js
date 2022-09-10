import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import { Container, Head, Title } from "./styled"
import { Button } from "@mui/material"
import Bookmark from "./Bookmark"
import NewBookmarkForm from "./NewBookmarkForm"

const BookmarkList = ({
  bookmarks = [],
  onClick = () => {},
  onSubmit = () => {},
  onDelete = () => {},
  onClose = () => {},
}) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = (randomKey) => {
    onClick(randomKey)
  }

  const handleSubmit = () => {
    onSubmit()
  }

  const handleDelete = (randomKey) => {
    onDelete(randomKey)
  }

  return (
    <>
      <Container>
        <Head className="head">
          <h3>已儲存</h3>
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
        </Head>
        <Title>
          <span>你的清單</span>
          <div className="new-bookmark">
            <Button onClick={() => setOpen(true)}>
              <AddIcon />
              <span>新增清單</span>
            </Button>
          </div>
        </Title>
        <div>
          {bookmarks.map((bookmark) => (
            <Bookmark
              key={bookmark.randomKey}
              {...bookmark}
              onClick={handleClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </Container>
      <NewBookmarkForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default BookmarkList
