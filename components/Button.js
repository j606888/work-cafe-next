import * as React from "react"
import MuiButton from "@mui/material/Button"
import EastIcon from "@mui/icons-material/East"

export default function Button() {
  return (
    <MuiButton variant="outlined" startIcon={<EastIcon />} size="large" sx={{ borderRadius: 3, paddingX: 3, paddingY: 1.6, backgroundColor: '#F5F5F5', color: '#757575', borderColor: '#757575'}}>
      快速搜尋 在我附近的咖啡店
    </MuiButton>
  )
}
