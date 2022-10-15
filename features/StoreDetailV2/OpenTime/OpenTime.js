import React, { useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Container, ToggleButton, OpenHours, DayBox } from "./styled"

const ToggleButton2 = ({ open, isOpenNow, closeTime, onClick }) => {
  const displayText = isOpenNow ? "營業中" : "休息中"
  const closeText =
    !open && closeTime && `・ 結束營業時間 ${_closePeriod(closeTime)}`
  const icon = open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
  const leftIcon = isOpenNow ? <WbSunnyIcon /> : <BedtimeIcon />

  return (
    <ToggleButton onClick={onClick}>
      {leftIcon}
      <span>{displayText}</span>
      <span>{closeText}</span>
      {icon}
    </ToggleButton>
  )
}
const OpenTime = ({ isOpenNow, closeTime, openingHours = [] }) => {
  const [open, setOpen] = useState(false)

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
            <DayBox key={index}>
              <div>{openingHour.label}</div>
              <div className="period">
                {openingHour.periods.map((period, idx) => (
                  <span key={idx}>{`${period.start} - ${period.end}`}</span>
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
