import { Avatar } from "@mui/material"
import React from "react"
import styled, { css } from "styled-components"
import { devices } from "constant/styled-theme"
import ImagesWorm from "components/ImagesWorm/ImagesWorm"

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  /* margin-bottom: 2rem; */
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  span {
    font-size: 12px;
  }

  p {
    font-size: 14px;
    white-space: pre-line;
  }

  @media ${devices.iphoneSE} {
    h6 {
      font-size: 14px;
    }

    span {
      font-size: 10px;
    }

    p {
      font-size: 12px;
    }

    max-width: calc(100% - 40px);
  }
`

const WorkCafeReviews = ({
  userName,
  userAvatarUrl,
  createdAt,
  description,
  photos=[]
}) => {
  return (
    <>
      <Container>
        <Avatar alt={userName} src={userAvatarUrl} />
        <Content>
          <h6>{userName}</h6>
          <span>{_dateString(createdAt)}</span>
          <p>{description}</p>
        </Content>
      </Container>
      <ImagesWorm images={photos} />
    </>
  )
}

function _dateString(timestamp) {
  const time = new Date(timestamp * 1000)
  const year = time.getFullYear()
  const month = time.getMonth()
  const date = time.getDate()
  const day = time.getDay()
  const isWeekend = [5, 6].includes(day) ? "週末造訪" : "平日造訪"

  return `${year}年${month}月${date}日・${isWeekend}`
}
export default WorkCafeReviews
