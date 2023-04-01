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

const OpenTimeGroup = ({ openType, openWeek, openHour, onChange=() => {} }) => {
  function handleOpenTypeChange(e) {
    onChange("openType", e.target.value)
  }

  function handleWeekChange(value) {
    onChange("openWeek", value)
  }

  function handleHourChange(value) {
    onChange("openHour", value)
  }

  return (
    <Container>
      <h3>營業時間</h3>
      <RadioGroup
        name="open-time-group"
        value={openType}
        onChange={handleOpenTypeChange}
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
            disabled={openType !== "OPEN_AT"}
            onChange={handleWeekChange}
            defaultSelectedValue={openWeek}
          />
          <Select
            options={OPEN_HOURS}
            disabled={openType !== "OPEN_AT"}
            onChange={handleHourChange}
            defaultSelectedValue={openHour}
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    & > :first-child {
      width: 100%;
      flex-shrink: 0;
    }
  }
`

export default OpenTimeGroup
