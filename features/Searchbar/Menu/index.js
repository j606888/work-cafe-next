import { useState } from "react"
import Button from "@mui/material/Button"
import MuiMenu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import {
  Box,
  Divider,
} from "@mui/material"

import RadioGroup from "@mui/material/RadioGroup"
import FormControl from "@mui/material/FormControl"
import WeekHourPicker from "./WeekHourPicker"
import RadioLabel from "./RadioLabel"

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openType, setOpenType] = useState('none')


  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRadioChange = (event) => {
    setOpenType(event.target.value)
  }
  return (
    <>
      <Button id="basic-button" onClick={handleClick}>
        Dashboard
      </Button>
      <h3>
        OpenType: {openType}
      </h3>
      {/* <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}> */}
      <Box sx={{ border: '1px solid black', display: 'inline-block'}}>
        <FormControl sx={{ width: "100%", my: 1 }}>
          <RadioGroup value={openType} onChange={handleRadioChange}>
            <RadioLabel label="不限時間" value='none' />
            <RadioLabel label="營業中" value='openNow' />
            <Divider sx={{ my: 1 }}/>
            <RadioLabel label="營業時間" value='openAt' />
          </RadioGroup>
        </FormControl>
        <WeekHourPicker active={openType==='openAt'}/>
        <Box sx={{textAlign: 'right'}}>
          <Button sx={{color: "#666"}}>清除</Button>
          <Button>套用</Button>
        </Box>
        </Box>
      {/* </MuiMenu> */}
    </>
  )
}
