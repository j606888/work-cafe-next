import Snackbar from "components/Snackbar"
import BookmarkList from "features/BookmarkList"
import Bookmark from "features/BookmarkTab/Bookmark"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import useSWR from "swr"
import useMapStore from "hooks/useMapStore"
import useStoreStore from "stores/useStoreStore"

const BookmarkContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`

const BookmarkListTab = () => {
  const clearStores = useStoreStore((state) => state.clearStores)
  const setStores = useStoreStore((state) => state.setStores)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const setMode = useMapStore((state) => state.setMode)
  const [showSnackbar, setShowSnackbar] = useState(null)
  const [randomKey, setRandomKey] = useState(null)
  const { data: bookmarks, mutateBookmarks } = useSWR("/bookmarks")
  const { data: bookmark } = useSWR(
    randomKey ? `/bookmarks/${randomKey}` : null
  )

  const handleDelete = async (randomKey) => {
    await deleteBookmark({ randomKey })
    setShowSnackbar("刪除成功")
    mutateBookmarks()
  }

  const handleClose = () => {
    clearStores()
    setPlaceId(null)
    setMode("MAP")
  }

  const handleBack = () => {
    setRandomKey(null)
    setPlaceId(null)
  }

  useEffect(() => {
    setStores(bookmark?.stores || [])
  }, [bookmark, setStores])

  const data = bookmark ? (
    <Bookmark
      stores={bookmark.stores}
      onBack={handleBack}
      bookmark={bookmark}
    />
  ) : (
    <BookmarkList
      bookmarks={bookmarks || []}
      onDelete={handleDelete}
      onClose={handleClose}
      onSubmit={() => mutateBookmarks()}
      onClick={(randomKey) => setRandomKey(randomKey)}
    />
  )

  return (
    <>
      <BookmarkContainer>{data}</BookmarkContainer>
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
