import React from "react"
import styled from "styled-components"

import useSWR from "swr"
import WorkCafeReview from "./ReviewCard"
import ReviewApi from "api/review"
import useUserStore from "stores/useUserStore"
import formControlStore from "stores/formControlStore"
import { Divider } from "@mui/material"
import { grey02, grey03 } from "constants/color"

const MyReview = ({ placeId }) => {
  const { setNewReviewOpen, setDefaultDecision } = formControlStore((state) => ({
    setNewReviewOpen: state.setNewReviewOpen,
    setDefaultDecision: state.setDefaultDecision,
  }))
  const user = useUserStore((state) => state.user)
  const { data: myReview, mutate } = useSWR(
    user ? `/stores/${placeId}/reviews/me` : null
  )
  const { mutate: mutateStore } = useSWR(`/stores/${placeId}`)

  async function handleDelete() {
    await ReviewApi.deleteMyReview({ placeId })
    mutate()
    mutateStore()
  }

  function handleEdit() {
    setNewReviewOpen(true)
  }

  function handleOpen() {
    setDefaultDecision(null)
    setNewReviewOpen(true)
  }

  return (
    <>
      <Container>
        {myReview ? (
          <div style={{ width: "100%" }}>
            <p>你的評論</p>
            <WorkCafeReview
              {...myReview}
              editable
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <Divider />
          </div>
        ) : (
          <>
            <img src="/guests/guest-orange.svg" alt="guest" />
            <FakeTextBox onClick={handleOpen}>
              留下我的評論（這裡適合辦公嗎？）
            </FakeTextBox>
          </>
        )}
      </Container>
      {/* <ReviewForm
        key={myReview?.id || "review-form"}
        myReview={myReview}
        placeId={placeId}
        open={newReviewOpen}
        name={name}
        onClose={() => setNewReviewOpen(false)}
        onSave={handleSave}
      /> */}
    </>
  )
}


const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 28px 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 24px 0;
  }
`

const FakeTextBox = styled.div`
  border: 1px solid ${grey03};
  height: 44px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;
  color: ${grey02};
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
  &:hover {
    background-color: #f5f5f5;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 36px;
    font-size: 12px;
  }
`

export default MyReview
