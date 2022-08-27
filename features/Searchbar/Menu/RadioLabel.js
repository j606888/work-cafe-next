import { FormControlLabel, Radio } from "@mui/material"
import React from "react"

const RadioLabel = ({ label, value }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio size="small" style={{ height: "30px" }} />}
      label={<span style={{ fontSize: 12, color: "#333" }}>{label}</span>}
      sx={{ ml: 1, width: "100%" }}
    />
  )
}

export default RadioLabel
