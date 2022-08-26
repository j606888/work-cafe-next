import { useState } from "react"
import Button from "@mui/material/Button"
import MuiMenu from "@mui/material/Menu"
import { Divider } from "@mui/material"
import RadioGroup from "@mui/material/RadioGroup"
import FormControl from "@mui/material/FormControl"
import WeekHourPicker from "./WeekHourPicker"
import RadioLabel from "./RadioLabel"

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openType, setOpenType] = useState("none")
  const [week, setWeek] = useState("0")
  const [hour, setHour] = useState("99")

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    // Do Save
    setAnchorEl(null)
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

  return (
    <>
      <Button id="basic-button" onClick={handleClick} variant="contained">
        營業時間
      </Button>
      <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
      {/* <Box sx={{ border: "1px solid black", display: "inline-block" }}> */}
        <FormControl sx={{ width: "100%", my: 1 }}>
          <RadioGroup value={openType} onChange={handleRadioChange}>
            <RadioLabel label="不限時間" value="none" />
            <RadioLabel label="營業中" value="openNow" />
            <Divider sx={{ my: 1 }} />
            <RadioLabel label="營業時間" value="openAt" />
          </RadioGroup>
        </FormControl>
        <WeekHourPicker
          active={openType === "openAt"}
          onWeekdayChange={handleWeekdayChange}
          onHourChange={handleHourChange}
          curWeek={week}
          curHour={hour}
        />
      </MuiMenu>
    </>
  )
}
