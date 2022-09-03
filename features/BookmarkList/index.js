import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import { Container, Head, Title } from "./styled"
import { Button } from "@mui/material"
import Bookmark from "./Bookmark"
import NewBookmarkForm from "./NewBookmarkForm"

const BookmarkList = ({ bookmarks = [], onClick = () => {}, onSubmit = () => {} }) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = (random_key) => {
    onClick(random_key)
  }

  const handleSubmit = (name) => {
    onSubmit(name)
  }

  return (
    <>
      <Container>
        <Head className="head">
          <h3>已儲存</h3>
          <CloseIcon />
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
              key={bookmark.random_key}
              {...bookmark}
              onClick={handleClick}
            />
          ))}
        </div>
      </Container>
      <NewBookmarkForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
    </>
  )
}

export default BookmarkList
