import ReviewForm from "features/ReviewForm"
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import useSWR from "swr"
import WorkCafeReviews from "./WorkCafeReviews/WorkCafeReviews"
import ReviewApi from "api/review"
import useUserStore from "stores/useUserStore"

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
  border: 1px solid #AFAAA3;
  height: 44px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;
  color: #42403F;
  font-style: normal;
  font-size: 14px;
  line-height: 19px;

  @media ${devices.mobileXl} {
    height: 36px;
    font-size: 12px;
  }
`

const NewReview = ({ placeId, name, onSave }) => {
  const [open, setOpen] = useState(false)
  const user = useUserStore(state => state.user)
  const { data: myReview, mutate } = useSWR(user ? `/stores/${placeId}/reviews/me` : null)

  async function handleSave() {
    setOpen(false)
    await onSave()
    mutate()
  }

  async function handleDelete() {
    await ReviewApi.deleteMyReview({ placeId })
    mutate()
  }

  function handleEdit() {
    setOpen(true)
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
            <FakeTextBox onClick={() => setOpen(true)}>
              留下我的評論（這裡適合辦公嗎？）
            </FakeTextBox>
          </>
        )}
      </Container>
      <ReviewForm
        key={myReview?.id || 'review-form'}
        myReview={myReview}
        placeId={placeId}
        open={open}
        name={name}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}

export default NewReview
