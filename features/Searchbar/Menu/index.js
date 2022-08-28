import { useState } from "react"
import Button from "@mui/material/Button"
import MuiMenu from "@mui/material/Menu"
import { Divider } from "@mui/material"
import RadioGroup from "@mui/material/RadioGroup"
import FormControl from "@mui/material/FormControl"
import WeekHourPicker from "./WeekHourPicker"
import RadioLabel from "./RadioLabel"
import Circle from "@mui/icons-material/Circle"
import styled from "styled-components"
import { Box } from "@mui/system"

const Container = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 16px;
  width: 220px;
`

const OpenTypes = {
  'none': '不限時間',
  'openNow': '營業中',
  'openAt': '營業時間'  
}

const weeks = {
  '0': '星期日',
  '1': '星期一',
  '2': '星期二',
  '3': '星期三',
  '4': '星期四',
  '5': '星期五',
  '6': '星期六',
}

const hours = {
  '99': '不限時間',
  '0': '深夜',
  '1': '凌晨 1:00',
  '2': '凌晨 2:00',
  '3': '凌晨 3:00',
  '4': '凌晨 4:00',
  '5': '清晨 5:00',
  '6': '清晨 6:00',
  '7': '清晨 7:00',
  '8': '早上 8:00',
  '9': '早上 9:00',
  '10': '早上 10:00',
  '11': '早上 11:00',
  '12': '中午',
  '13': '下午 1:00',
  '14': '下午 2:00',
  '15': '下午 3:00',
  '16': '下午 4:00',
  '17': '下午 5:00',
  '18': '下午 6:00',
  '19': '晚上 7:00',
  '20': '晚上 8:00',
  '21': '晚上 9:00',
  '22': '晚上 10:00',
  '23': '晚上 11:00',
}

export default function Menu({ onOpenTimeChange }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openType, setOpenType] = useState("none")
  const [week, setWeek] = useState("0")
  const [hour, setHour] = useState("99")

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    onOpenTimeChange(openType, week, hour)
    setAnchorEl(null)
  }

  const handleReset = () => {
    setOpenType("none")
    setWeek("0")
    setHour("99")
  }

  const handleRadioChange = (event) => {
    setOpenType(event.target.value)
  }

  const handleWeekdayChange = (value) => {
    setOpenType("openAt")
    setWeek(value)
  }

  const handleHourChange = (value) => {
    setOpenType("openAt")
    setHour(value)
  }

  const weekHour = `${weeks[week]} ${hours[hour]}`
  const displayText = ['none', 'openNow'].includes(openType) ? OpenTypes[openType] : weekHour

  return (
    <>
      <Container onClick={handleClick}>
        <Circle sx={{color: '#ccc', mr:1, ml: .5 }} />
        {displayText}
      </Container>
      <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <FormControl sx={{ width: "100%", my: 1 }}>
          <RadioGroup value={openType} onChange={handleRadioChange}>
            <RadioLabel label={OpenTypes['none']} value="none" />
            <RadioLabel label={OpenTypes['openNow']} value="openNow" />
            <Divider sx={{ my: 1 }} />
            <RadioLabel label={OpenTypes['openAt']} value="openAt" />
          </RadioGroup>
        </FormControl>
        <WeekHourPicker
          active={openType === "openAt"}
          onWeekdayChange={handleWeekdayChange}
          onHourChange={handleHourChange}
          curWeek={week}
          curHour={hour}
        />
        <Divider />
        <Box sx={{mt: 1, textAlign: 'center'}}>
          <Button sx={{color: '#666'}} onClick={handleReset}>清除</Button>
          <Button onClick={handleClose}>套用</Button>
        </Box>
      </MuiMenu>
    </>
  )
}
