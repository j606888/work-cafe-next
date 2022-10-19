import { Avatar, Divider } from "@mui/material"
import ReviewForm from "features/ReviewForm"
import React from "react"
import { useState } from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import useSWR from "swr"
import WorkCafeReviews from "./WorkCafeReviews/WorkCafeReviews"
import ReviewApi from "api/review"

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 28px 0;

  @media ${devices.iphoneSE} {
    margin: 24px 0;
  }
`

const FakeTextBox = styled.div`
  border: 1px solid #757575;
  height: 40px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;

  @media ${devices.iphoneSE} {
    height: 36px;
    font-size: 12px;
  }
`

const NewReview = ({ placeId, name, onSave }) => {
  const [open, setOpen] = useState(false)
  const { data: myReview, mutate } = useSWR(`/stores/${placeId}/reviews/me`)

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
            <Divider />
          </div>
        ) : (
          <>
            <Avatar />
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
