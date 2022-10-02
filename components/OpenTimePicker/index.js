import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material"
import styled from "styled-components"
import { OPEN_TYPES, OPEN_WEEKS, OPEN_HOURS } from "constant/openTime"
import { useState } from "react"
import { useEffect } from "react"

const Container = styled.div``

const OpenTimePicker = ({ initProps, onChange = () => {} }) => {
  const [openType, setOpenType] = useState(
    initProps?.openType || OPEN_TYPES[0].value
  )
  const [openWeek, setOpenWeek] = useState(
    initProps?.openWeek || OPEN_WEEKS[0].value
  )
  const [openHour, setOpenHour] = useState(
    initProps?.openHour || OPEN_HOURS[0].value
  )

  const handleChange = (event) => {
    setOpenType(event.target.value)
  }

  const handleChangeWeek = (event) => {
    setOpenWeek(event.target.value)
  }

  const handleChangeHour = (event) => {
    setOpenHour(event.target.value)
  }

  useEffect(() => {
    openType === "OPEN_AT"
      ? onChange({ openType, openWeek, openHour })
      : onChange({ openType })
  }, [openType, openWeek, openHour])

  return (
    <Container>
      <FormControl>
        <FormLabel>營業時間</FormLabel>
        <RadioGroup
          row
          name="open-time"
          value={openType}
          onChange={handleChange}
        >
          {OPEN_TYPES.map((openType) => (
            <FormControlLabel
              key={openType.label}
              value={openType.value}
              control={<Radio />}
              label={openType.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl
        size="small"
        sx={{ m: 1, minWidth: 120 }}
        disabled={openType !== "OPEN_AT"}
      >
        <Select id="openWeek" value={openWeek} onChange={handleChangeWeek}>
          {OPEN_WEEKS.map((openWeek) => (
            <MenuItem key={openWeek.label} value={openWeek.value}>
              {openWeek.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        sx={{ m: 1, minWidth: 160 }}
        disabled={openType !== "OPEN_AT"}
      >
        <Select id="openHour" value={openHour} onChange={handleChangeHour}>
          {OPEN_HOURS.map((openHour) => (
            <MenuItem key={openHour.label} value={openHour.value}>
              {openHour.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  )
}

export default OpenTimePicker
