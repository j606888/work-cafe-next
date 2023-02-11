import ReviewForm from "features/ReviewForm"
import React from "react"
import styled from "styled-components"
import { devices } from "constants/styled-theme"
import useSWR from "swr"
import WorkCafeReviews from "./WorkCafeReviews/WorkCafeReviews"
import ReviewApi from "api/review"
import useUserStore from "stores/useUserStore"
import formControlStore from "stores/formControlStore"

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 28px 0;

  @media ${devices.mobileXl} {
    margin: 24px 0;
  }
`

const FakeTextBox = styled.div`
  border: 1px solid #afaaa3;
  height: 44px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;
  color: #42403f;
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
  &:hover {
    background-color: #f5f5f5;
  }

  @media ${devices.mobileXl} {
    height: 36px;
    font-size: 12px;
  }
`

const NewReview = ({ placeId, name, onSave }) => {
  const { newReviewOpen, setNewReviewOpen } = formControlStore((state) => ({
    newReviewOpen: state.newReviewOpen,
    setNewReviewOpen: state.setNewReviewOpen,
  }))
  const user = useUserStore((state) => state.user)
  const { data: myReview, mutate } = useSWR(
    user ? `/stores/${placeId}/reviews/me` : null
  )
  const { mutate: mutateStore } = useSWR(`/stores/${placeId}`)

  async function handleSave() {
    setNewReviewOpen(false)
    await onSave()
    mutate()
    mutateStore()
  }

  async function handleDelete() {
    await ReviewApi.deleteMyReview({ placeId })
    mutate()
    mutateStore()
  }

  function handleEdit() {
    setNewReviewOpen(true)
  }

  return (
    <>
      <Container>
        {myReview ? (
          <div style={{ width: "100%" }}>
            <p>你的評論</p>
            <WorkCafeReviews
              {...myReview}
              editable
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        ) : (
          <>
            <img src="/guest.svg" alt="guest" />
            <FakeTextBox onClick={() => setNewReviewOpen(true)}>
              留下我的評論（這裡適合辦公嗎？）
            </FakeTextBox>
          </>
        )}
      </Container>
      <ReviewForm
        key={myReview?.id || "review-form"}
        myReview={myReview}
        placeId={placeId}
        open={newReviewOpen}
        name={name}
        onClose={() => setNewReviewOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}

export default NewReview
