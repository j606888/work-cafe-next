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
import { OPEN_TYPES, OPEN_WEEKS, OPEN_HOURS } from "constants/openTime"
import { orange100 } from "constants/color"

const Container = styled.div``

const OpenTimePicker = ({
  openType,
  openWeek,
  openHour,
  onChange = () => {},
}) => {
  const handleChange = (event) => {
    const newOpenType = event.target.value
    onChange({ openType: newOpenType, openWeek, openHour })
  }

  const handleChangeWeek = (event) => {
    const newOpenWeek = event.target.value
    onChange({ openType, openWeek: newOpenWeek, openHour })
  }

  const handleChangeHour = (event) => {
    const newOpenHour = event.target.value
    onChange({ openType, openWeek, openHour: newOpenHour })
  }

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
              control={
                <Radio
                  sx={{
                    color: orange100,
                    "&.Mui-checked": {
                      color: orange100,
                    },
                  }}
                />
              }
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
