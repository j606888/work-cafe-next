import { useState } from "react"
import styled from "styled-components"
import { Box, Divider } from "@mui/material"

const Container = styled.div`
  input {
    display: none;
  }

  label {
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #ccc;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 6px;
    margin: 6px;
    cursor: pointer;
    color: #333;
    font-size: 12px;
  }

  input:checked + label {
    ${({ active }) =>
      active &&
      `
      background-color: #e8f0fe;
      border: 2px solid #174fa6;
      line-height: 26px;
      color: #174fa6;
    `}
  }
`

const CustomRadio = ({
  name,
  value,
  text,
  checked,
  width = "56px",
  onClick,
}) => {
  return (
    <>
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={checked}
        onClick={onClick}
      />
      <label
        htmlFor={`${name}-${value}`}
        style={{ width: width }}
      >
        {text}
      </label>
    </>
  )
}

const RadioGroup = ({ children, onClick, name }) => {
  const radios = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick, name })
    }
  })
  return radios
}

const WeekHourPicker = ({ active = true }) => {
  const [weekday, setWeekday] = useState(0)
  const [hour, setHour] = useState(null)

  const handleWeekdayChange = (event) => {
    console.log("Weekday Change")
    console.log(event.target.value)
  }

  return (
    <Container active={active}>
      <Box sx={{ display: "flex", mx: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <RadioGroup onClick={handleWeekdayChange} name="weekday">
            <CustomRadio value={0} text="星期日" />
            <CustomRadio value={1} text="星期一" />
            <CustomRadio value={2} text="星期二" />
            <CustomRadio value={3} text="星期三" />
            <CustomRadio value={4} text="星期四" />
            <CustomRadio value={5} text="星期五" />
            <CustomRadio value={6} text="星期六" />
          </RadioGroup>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
        <Box>
          <Box>
            <CustomRadio name="hour" value={null} text="不限時間" width="158px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-0" text="深夜" width="76px" />
            <CustomRadio name="hour" id="h-12" text="中午" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-1" text="凌晨 1:00" width="76px" />
            <CustomRadio name="hour" id="h-13" text="下午 1:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-2" text="凌晨 2:00" width="76px" />
            <CustomRadio name="hour" id="h-14" text="下午 2:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-3" text="凌晨 3:00" width="76px" />
            <CustomRadio name="hour" id="h-15" text="下午 3:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-5" text="凌晨 4:00" width="76px" />
            <CustomRadio name="hour" id="h-16" text="下午 4:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-5" text="清晨 5:00" width="76px" />
            <CustomRadio name="hour" id="h-17" text="下午 5:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-6" text="清晨 6:00" width="76px" />
            <CustomRadio name="hour" id="h-18" text="下午 6:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-7" text="清晨 7:00" width="76px" />
            <CustomRadio name="hour" id="h-19" text="晚上 7:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-8" text="早上 8:00" width="76px" />
            <CustomRadio name="hour" id="h-20" text="晚上 8:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-9" text="早上 9:00" width="76px" />
            <CustomRadio name="hour" id="h-21" text="晚上 9:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-10" text="早上 10:00" width="76px" />
            <CustomRadio name="hour" id="h-22" text="晚上 10:00" width="76px" />
          </Box>
          <Box sx={{ display: "flex" }}>
            <CustomRadio name="hour" id="h-11" text="早上 11:00" width="76px" />
            <CustomRadio name="hour" id="h-23" text="晚上 11:00" width="76px" />
          </Box>
        </Box>
      </Box>
      <Divider />
    </Container>
  )
}

export default WeekHourPicker
