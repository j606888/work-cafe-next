import React, { useState } from "react"
import styled, { css } from "styled-components"
import { devices } from "constants/styled-theme"

const ToggleButton2 = ({ open, isOpenNow, closeTime, onClick }) => {
  const displayText = isOpenNow ? "營業中" : "休息中"
  const closeText =
    !open &&
    isOpenNow &&
    closeTime &&
    `・ 結束營業時間 ${_closePeriod(closeTime)}`
  const icon = open ? (
    <img src="/up-btn.svg" alt="up-btn" />
  ) : (
    <img src="/down-btn.svg" alt="down-btn" />
  )

  return (
    <ToggleButton onClick={onClick}>
      <img src="/clock.svg" alt="clock" />
      <span>{displayText}</span>
      <span>{closeText}</span>
      {icon}
    </ToggleButton>
  )
}
const OpenTime = ({ isOpenNow, closeTime, openingHours = [] }) => {
  const [open, setOpen] = useState(false)
  const today = new Date()
  const weekday = today.getDay()

  function toggleOpen() {
    setOpen((cur) => !cur)
  }

  return (
    <Container>
      <ToggleButton2
        open={open}
        isOpenNow={isOpenNow}
        closeTime={closeTime}
        onClick={toggleOpen}
      />
      {open && (
        <OpenHours>
          {openingHours.map((openingHour, index) => (
            <DayBox key={index} bold={weekday == openingHour.weekday}>
              <div>{openingHour.label}</div>
              <div className="period">
                {openingHour.periodTexts.map((periodText, idx) => (
                  <span key={idx}>{periodText}</span>
                ))}
              </div>
            </DayBox>
          ))}
        </OpenHours>
      )}
    </Container>
  )
}

function _closePeriod(closeTime) {
  const hours = closeTime.slice(0, 2)
  const minutes = closeTime.slice(2, 4)
  return hours + ":" + minutes
}

export default OpenTime

const Container = styled.div`
  padding-left: 41px;

  @media ${devices.mobileXl} {
    margin: 0 24px;
    padding-left: 0;
  }
`

const ToggleButton = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 0 0;
  font-size: 14px;
  color: #222120;
  cursor: pointer;
  align-items: center;

  a {
    color: #222120;
  }

  @media ${devices.mobileXl} {
    a {
      display: none;
    }
  }
`

const OpenHours = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #222120;
`

const DayBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 32px;
  gap: 1rem;
  margin-bottom: 12px;

  ${({ bold }) => bold && css`
    font-weight: bold;
  `}

  .period {
    display: flex;
    flex-direction: column;
  }
`
