import { fetcher } from "api"
import Snackbar from "components/Snackbar"
import BookmarkList from "features/BookmarkList"
import BookmarkStore from "features/UserBookmarkMap/BookmarkStore"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import useSWR, { useSWRConfig } from "swr"
import { useDispatch } from "react-redux"
import { updateStores } from "store/slices/store"

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
          />
        </BookmarkContainer>
      )}
      {randomKey && (
        <BookmarkContainer>
          <BookmarkStore
            stores={bookmark?.stores}
            onClick={() => setRandomKey(null)}
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
