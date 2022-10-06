import React from "react"
import styled from "styled-components"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .open-status {
    color: #d92f25;
    color: ${({ isOpen }) => (isOpen ? "green" : "#D92F25")};
  }

  .icon-list {
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    cursor: pointer;
  }

  .opening-list {
    display: block;
    padding-left: 6rem;
    width: 100%;
  }

  .weekday {
    align-items: flex-start;
    gap: 1.5rem;
  }

  .opening-hour {
    display: flex;
    flex-direction: column;

    span {
      display: block;
    }
  }
`

const OpeningTime = ({ openingHours = [], isOpenNow = false }) => {
  return (
    <Container isOpen={isOpenNow}>
      <div className="icon-list">
        <AccessTimeIcon />
        <span className="open-status">{isOpenNow ? "營業中" : "已打烊"}</span>
      </div>
      <div className="opening-list">
        {openingHours.map((openingHour) => {
          const periods = openingHour.periods.map((period) => {
            return (
              <span key={`${period.start}${period.end}`}>
                {`${period.start}-${period.end}`}
              </span>
            )
          })
          return (
            <div className="weekday" key={openingHour.label}>
              <span>{openingHour.label}</span>
              <div className="opening-hour">
                {periods.length === 0 ? <span>休息</span> : periods}
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default OpeningTime
