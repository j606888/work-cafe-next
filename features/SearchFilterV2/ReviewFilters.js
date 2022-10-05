import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import React from "react"

const option = (value, label) => ({
  value,
  label,
})

const RADIO_GROUPS = {
  roomVolume: {
    name: "roomVolume",
    label: "音量",
    options: [
      option("quiet", "幾乎無人說話"),
      option("normal", "輕聲交談"),
      option("loud", "正常交談"),
    ],
  },
  timeLimit: {
    name: "timeLimit",
    label: "限時規定",
    options: [
      option("no", "無限時"),
      option("weekend", "週末限時"),
      option("yes", "有限時"),
    ],
  },
  socketSupply: {
    name: "socketSupply",
    label: "插座供應",
    options: [
      option("yes", "大部分有插座"),
      option("rare", "些許插座"),
      option("no", "沒有插座"),
    ],
  },
}

const RadioGroups = ({ name, label, options, value, onChange = () => {} }) => {
  const handleClick = (event) => {
    const value = event.target.value
    if (value) onChange(value)
  }
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row name={name} value={value} onClick={handleClick}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
            sx={{ width: "30%" }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

const ReviewFilters = ({
  roomVolume,
  timeLimit,
  socketSupply,
  onChange = () => {},
}) => {
  return (
    <>
      <RadioGroups
        {...RADIO_GROUPS.roomVolume}
        value={roomVolume}
        onChange={(newRoomVolume) => onChange("roomVolume", newRoomVolume)}
      />
      <RadioGroups
        {...RADIO_GROUPS.timeLimit}
        value={timeLimit}
        onChange={(newTimeLimit) => onChange("timeLimit", newTimeLimit)}
      />
      <RadioGroups
        {...RADIO_GROUPS.socketSupply}
        value={socketSupply}
        onChange={(newSocketSupply) =>
          onChange("socketSupply", newSocketSupply)
        }
      />
    </>
  )
}

export default ReviewFilters
