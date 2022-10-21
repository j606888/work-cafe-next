import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
} from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import React from "react"

const ReviewOverLabel = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span>多人推薦的店家</span>
      <Tooltip title="超過6成以上推薦的店家" placement="right">
        <HelpOutlineIcon />
      </Tooltip>
    </Box>
  )
}

const AdvancedPicker = ({ wakeUp, reviewOver, onChange }) => {
  const wakeUpChange = (e) => {
    onChange("wakeUp", e.target.checked)
  }
  const reviewOverChange = (e) => {
    onChange("reviewOver", e.target.checked)
  }

  return (
    <>
      <p>進階</p>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={wakeUp} onChange={wakeUpChange} />}
          label="只顯示有評論的店家"
        />
        {/* <FormControlLabel
          control={<Switch checked={reviewOver} onChange={reviewOverChange} disabled />}
          label={<ReviewOverLabel />}
        /> */}
      </FormGroup>
    </>
  )
}

export default AdvancedPicker
