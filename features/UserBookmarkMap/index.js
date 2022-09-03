import { fetcher } from "api"
import { createBookmark } from "api/bookmark"
import BookmarkList from "features/BookmarkList"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import { useState } from "react"
import styled from "styled-components"
import useSWR, { useSWRConfig } from "swr"

const BookmarkContainer = styled.div`
  position: absolute;
  left: 0;
  top: 56px;
  z-index: 100;
`

const UserBookmarkMap = () => {
  const [map, setMap] = useState(null)
  const { mutate } = useSWRConfig()

  const { data: bookmarks } = useSWR("/bookmarks", fetcher)

  const handleSubmit = async (name) => {
    await createBookmark({ name })
    mutate("/bookmarks")
  }

  return (
    <>
      <BookmarkContainer>
        <BookmarkList bookmarks={bookmarks || []} onSubmit={handleSubmit}/>
      </BookmarkContainer>
      <GoogleMapWrapper map={map} setMap={setMap} marginTop="56px" />
    </>
  )
}

export default UserBookmarkMap
