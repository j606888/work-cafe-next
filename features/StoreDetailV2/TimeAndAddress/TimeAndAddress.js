import React from "react"
import styled from "styled-components"
import CircleIcon from "@mui/icons-material/Circle"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const Container = styled.div`
  margin-left: 104px;
  margin-top: 12px;
`

const ListItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: #757575;

  a {
    color: #757575;
  }
`

const TimeAndAddress = ({ address, isOpenNow, openingHours, url }) => {
  return (
    <Container>
      <ListItem>
        <CircleIcon />
        {isOpenNow ? "營業中" : "休息中"}・ 結束營業時間
        <span>下午 6:00</span>
        <KeyboardArrowDownIcon />
      </ListItem>
      <ListItem>
        <CircleIcon />
        <span>{address}・</span>
        <a href={url} target="_blank" rel="noreferrer">
          開啟Google Map導航
        </a>
      </ListItem>
    </Container>
  )
}

export default TimeAndAddress
