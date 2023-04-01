import React from "react"
import useUserStore from "stores/useUserStore"
import styled from "styled-components"
import useSWR from "swr"
import MyReview from "./NewReview"
import ReviewCard from "./ReviewCard"

const WorkCafeReviews = ({ placeId }) => {
  const user = useUserStore((state) => state.user)
  const { data: reviews, mutate: reviewsMutate } = useSWR(
    `/stores/${placeId}/reviews`
  )
  const { data: myReview, mutate } = useSWR(
    user ? `/stores/${placeId}/reviews/me` : null
  )

  if (!reviews) return null

  return (
    <>
      <MyReview placeId={placeId} />
      {reviews.reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
      {reviews.reviews.length === 0 && !myReview && (
        <LeaveFirstReview>
          還沒有人給過評論 ( ´•̥̥̥ω•̥̥̥` ) 不如你就當第一位吧！
        </LeaveFirstReview>
      )}
    </>
  )
}

const LeaveFirstReview = styled.div`
  margin: 3rem auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.black02};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`

export default WorkCafeReviews
