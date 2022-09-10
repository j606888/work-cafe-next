import { fetcher } from 'api'
import Snackbar from 'components/Snackbar'
import BookmarkList from 'features/BookmarkList'
import BookmarkStore from 'features/UserBookmarkMap/BookmarkStore'
import React, { useState } from 'react'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from "swr"

const BookmarkContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`

const BookmarkListV2 = () => {
  const [isHome, setIsHome] = useState(true)
  const [showSnackbar, setShowSnackbar] = useState(null)
  const [randomKey, setRandomKey] = useState(null)
  const { mutate } = useSWRConfig()
  const { data: bookmarks } = useSWR("/bookmarks", fetcher)
  const { data: bookmark } = useSWR(randomKey ? `/bookmarks/${randomKey}` : null, fetcher)

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
    setIsHome(false)
  }

  return (
    <>
      {isHome && (<BookmarkContainer>
        <BookmarkList
          bookmarks={bookmarks || []}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClick={handleClick}
        />
      </BookmarkContainer>)}
      {!isHome && (
        <BookmarkContainer>
          <BookmarkStore stores={bookmark?.stores} onClick={() => setIsHome(true)}/>
        </BookmarkContainer>
      )}
      {showSnackbar && <Snackbar onClose={() => setShowSnackbar(false)} 
        message={showSnackbar}
      />}
    </>
  )
}

export default BookmarkListV2
