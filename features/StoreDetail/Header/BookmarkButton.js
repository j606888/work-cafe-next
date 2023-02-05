import React, { useState } from "react"
import { addToBookmark, removeFromBookmark } from "api/user_bookmark"
import ActionButton from "components/Button/ActionButton"
import { CircularProgress } from "@mui/material"
import styled from "styled-components"
import useSWR from "swr"
import useUserStore from "stores/useUserStore"
import { devices } from "constants/styled-theme"
import { grey04 } from "constants/color"
import { formControl } from "features/AccountMenu"

const BookmarkButton = ({ placeId }) => {
  const setOpenForm = formControl((state) => state.setOpenForm)
  const [loading, setLoading] = useState(false)
  const { data: store, mutate } = useSWR(`/stores/${placeId}`)
  const isLogin = useUserStore((state) => state.isLogin)

  async function handleAddBookmark() {
    if (isLogin) {
      setLoading(true)
      await addToBookmark({ placeId })
      await mutate()
      setLoading(false)
    } else {
      setOpenForm(true)
    }
  }
  async function handleRemoveBookmark() {
    if (isLogin) {
      setLoading(true)
      await removeFromBookmark({ placeId })
      await mutate()
      setLoading(false)
    } else {
      setOpenForm(true)
    }
  }

  if (loading || !store)
    return (
      <LoadingContainer>
        <CircularProgress color="inherit" />
      </LoadingContainer>
    )

  return store?.isBookmark ? (
    <ActionButton svg="like-filled" onClick={handleRemoveBookmark}>
      已收藏
    </ActionButton>
  ) : (
    <ActionButton svg="like" onClick={handleAddBookmark}>
      收藏
    </ActionButton>
  )
}

const LoadingContainer = styled.div`
  border: 1px solid ${grey04};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 12px 0 8px;
  cursor: pointer;
  color: ${grey04};
  padding: 0 24px;

  @media ${devices.mobileXl} {
    border: none;
    padding: 0;

    /* span {
      display: none;
    } */
  }
`

export default BookmarkButton
