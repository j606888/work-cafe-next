import React from "react"
import styled from "styled-components"
import { OPEN_TYPES, OPEN_WEEKS, OPEN_HOURS } from "constants/openTime"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import DoneIcon from "@mui/icons-material/Done"
import _ from "lodash"

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  font-size: 14px;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f2f2f2;
  }
`
const Content = ({ openType, openWeek, openHour }) => {
  if (openType === OPEN_TYPES.NONE) {
    return (
      <>
        <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5 }} />
        <span>營業時間</span>
        <ArrowDropDownIcon />
      </>
    )
  } else if (openType === OPEN_TYPES.OPEN_NOW) {
    return (
      <>
        <DoneIcon sx={{ fontSize: 18, mr: 0.5, color: "#195ABD" }} />
        <span style={{ color: "#174FA6" }}>
          <b>營業中</b>
        </span>
        <ArrowDropDownIcon sx={{ color: "#174FA6" }} />
      </>
    )
  } else if (openType === OPEN_TYPES.OPEN_AT) {
    const weekLabel = _.find(OPEN_WEEKS, { value: +openWeek })
    const hourLabel = _.find(OPEN_HOURS, { value: +openHour })
    return (
      <>
        <DoneIcon sx={{ fontSize: 18, mr: 0.5, color: "#195ABD" }} />
        <span style={{ color: "#174FA6" }}>
          <b>
            {weekLabel.label} {hourLabel.label}
          </b>
        </span>
        <ArrowDropDownIcon sx={{ color: "#174FA6" }} />
      </>
    )
  }
}
const OpenButton = ({ openType, openWeek, openHour, onClick = () => {} }) => {
  const bgColor = openType === OPEN_TYPES.NONE ? "#fff" : "#E8F0FE"

  return (
    <Container onClick={onClick} bgColor={bgColor}>
      <Content openType={openType} openWeek={openWeek} openHour={openHour} />
    </Container>
  )
}

export default OpenButton
