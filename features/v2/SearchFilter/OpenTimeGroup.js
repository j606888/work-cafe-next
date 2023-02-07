import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import Select from "components/Select"
import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"
import { orange100 } from "constants/color"

const RadioStyle = {
  "&.Mui-checked": {
    color: orange100,
  },
}

const OpenTimeGroup = ({ defaultOptions={}, onChange=() => {} }) => {
  const [openTime, setOpenTime] = useState(defaultOptions.openTime || "NONE")
  const [openWeek, setOpenWeek] = useState(
    defaultOptions.openWeek || OPEN_WEEKS[0]
  )
  const [openHour, setOpenHour] = useState(
    defaultOptions.openHour || OPEN_HOURS[0]
  )

  function handleOpenTimeChange(e) {
    setOpenTime(e.target.value)
  }

  function handleWeekChange(option) {
    setOpenWeek(option)
  }

  function handleHourChange(option) {
    setOpenHour(option)
  }

  useEffect(() => {
    if (openTime === "OPEN_AT") {
      onChange({ openTime, openWeek: openWeek.value, openHour: openHour.value })
    } else {
      onChange({ openTime })
    }
  }, [onChange, openTime, openWeek, openHour])

  return (
    <Container>
      <h3>營業時間</h3>
      <RadioGroup
        name="open-time-group"
        value={openTime}
        onChange={handleOpenTimeChange}
      >
        <FormControlLabel
          value="NONE"
          control={<Radio sx={RadioStyle} />}
          label="不限"
        />
        <FormControlLabel
          value="OPEN_NOW"
          control={<Radio sx={RadioStyle} />}
          label="營業中"
        />
        <CustomLabel>
          <FormControlLabel
            value="OPEN_AT"
            control={<Radio sx={RadioStyle} />}
            label="自訂"
            sx={{ marginRight: "48px" }}
          />
          <Select
            options={OPEN_WEEKS}
            disabled={openTime !== "OPEN_AT"}
            onChange={handleWeekChange}
            defaultSelectedOption={openWeek}
          />
          <Select
            options={OPEN_HOURS}
            disabled={openTime !== "OPEN_AT"}
            onChange={handleHourChange}
            defaultSelectedOption={openHour}
          />
        </CustomLabel>
      </RadioGroup>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 40px;
`

const CustomLabel = styled.div`
  display: flex;
  gap: 12px;
`

export default OpenTimeGroup
