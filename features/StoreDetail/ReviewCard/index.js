import { Avatar, Divider } from "@mui/material"
import RatingStars from "components/RatingStars"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 1rem 1.5rem 0;
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    span {
      font-size: 14px;
    }
  }

  .rating {
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
      font-size: 14px;
      color: #666;
    }
  }

  p {
    white-space: pre-line;
    margin-top: 0.5rem;
    font-size: 14px;
    line-height: 150%;
  }
`

const ReviewCard = () => {
  return (
    <>
      <Container>
        <div className="user-info">
          <Avatar
            alt="Cindy Baker"
            sx={{ width: 28, height: 28, mr: 1.5 }}
            src="https://lh3.googleusercontent.com/a/AItbvmm9Dm9OrgOfvkqRfgBo9LJXJfJnnfxGialgFlru=s128-c0x00000000-cc-rp-mo-ba5"
          />
          <span>brian wang</span>
        </div>
        <div className="rating">
          <RatingStars rating={3.7} showRate={false} />
          <span>3 年前</span>
        </div>
        <p>
          {`${"巷弄間的復古懷舊風格，\n午後時光，偕同朋友一起喝咖啡。\n兒子喝到不同口味的奶茶，\n讓他想到去香港時，\n喝到的奶茶一樣味道（普洱奶茶）。"}`}
        </p>
      </Container>
      <Divider />
    </>
  )
}

export default ReviewCard
