import { fetcher } from "api"
import Snackbar from "components/Snackbar"
import BookmarkList from "features/BookmarkList"
import Bookmark from "features/BookmarkListV2/Bookmark"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import useSWR, { useSWRConfig } from "swr"
import { useDispatch } from "react-redux"
import { updateStores, changeMode } from "store/slices/store"

const BookmarkContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`

const BookmarkListV2 = () => {
  const [showSnackbar, setShowSnackbar] = useState(null)
  const [randomKey, setRandomKey] = useState(null)
  const { mutate } = useSWRConfig()
  const { data: bookmarks } = useSWR("/bookmarks", fetcher)
  const { data: bookmark } = useSWR(
    randomKey ? `/bookmarks/${randomKey}` : null,
    fetcher
  )
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    mutate("/bookmarks")
  }

  const handleDelete = async (randomKey) => {
    await deleteBookmark({ randomKey })
    setShowSnackbar("刪除成功")
    mutate("/bookmarks")
  }

  const handleClick = async (randomKey) => {
    setRandomKey(randomKey)
  }

  const handleClose = () => {
    dispatch(updateStores([]))
    dispatch(changeMode("MAP"))
  }

  useEffect(() => {
    dispatch(updateStores(bookmark?.stores || []))
  }, [bookmark, dispatch])

  return (
    <>
      {!randomKey && (
        <BookmarkContainer>
          <BookmarkList
            bookmarks={bookmarks || []}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onClick={handleClick}
            onClose={handleClose}
          />
        </BookmarkContainer>
      )}
      {randomKey && (
        <BookmarkContainer>
          <Bookmark
            stores={bookmark?.stores}
            onBack={() => setRandomKey(null)}
          />
        </BookmarkContainer>
      )}
      {showSnackbar && (
        <Snackbar
          onClose={() => setShowSnackbar(false)}
          message={showSnackbar}
        />
      )}
    </>
  )
}

export default BookmarkListV2
