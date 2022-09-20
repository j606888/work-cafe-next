import Snackbar from "components/Snackbar"
import BookmarkList from "features/BookmarkList"
import Bookmark from "features/BookmarkTab/Bookmark"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import useSWR, { useSWRConfig } from "swr"
import useMapStore from "hooks/useMapStore"
import useStoreStore from "hooks/useStoreStore"

const BookmarkContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`

const BookmarkListTab = () => {
  const clearStores = useStoreStore(state => state.clearStores)
  const setStores = useStoreStore(state => state.setStores)
  const setMode = useMapStore(state => state.setMode)
  const setBouncePlaceId = useMapStore(state => state.setBouncePlaceId)
  const [showSnackbar, setShowSnackbar] = useState(null)
  const [randomKey, setRandomKey] = useState(null)
  const { mutate } = useSWRConfig()
  const { data: bookmarks } = useSWR("/bookmarks")
  const { data: bookmark } = useSWR(
    randomKey ? `/bookmarks/${randomKey}` : null
  )

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
    clearStores()
    setBouncePlaceId(null)
    setMode("MAP")
  }

  useEffect(() => {
    if (bookmarks?.stores) {
      setStores(bookmarks?.stores)
    } else {
      clearStores()
    }
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

export default BookmarkListTab
