import { fetcher } from "api"
import { createBookmark, deleteBookmark } from "api/bookmark"
import Snackbar from "components/Snackbar"
import BookmarkList from "features/BookmarkList"
import Drawer from "features/Drawer"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import { useState } from "react"
import styled from "styled-components"
import useSWR, { useSWRConfig } from "swr"
import BookmarkStore from "./BookmarkStore"

const BookmarkContainer = styled.div`
  position: absolute;
  left: 0;
  top: 56px;
  z-index: 100;
`

const UserBookmarkMap = () => {
  const [map, setMap] = useState(null)
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
        <BookmarkStore stores={bookmark?.stores} onClick={() => setIsHome(true)}/>
      )}
      
      <GoogleMapWrapper map={map} setMap={setMap} marginTop="56px" />
      {showSnackbar && <Snackbar onClose={() => setShowSnackbar(false)} 
        message={showSnackbar}
      />}
    </>
  )
}

export default UserBookmarkMap
