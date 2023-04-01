import React, { useState } from "react"
import { addToBookmark, removeFromBookmark } from "api/user_bookmark"
import ActionButton from "components/Button/ActionButton"
import { CircularProgress } from "@mui/material"
import styled from "styled-components"
import useSWR from "swr"
import useUserStore from "stores/useUserStore"
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
  border: 1px solid ${({ theme }) => theme.colors.grey02};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 12px 0 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey02};
  padding: 0 24px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border: none;
    padding: 0;

    /* span {
      display: none;
    } */
  }
`

export default BookmarkButton
