import React from "react"
import { Box, Tooltip as MuiTooltip } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
import { grey02 } from "constants/color"

const StyledTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: grey02,
    color: "#FFFFFF",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px',
  },
}))

const Tooltip = ({ children, title, placement="bottom" }) => {
  return (
    <StyledTooltip title={title} placement={placement}>
      <Box>{children}</Box>
    </StyledTooltip>
  )
}

export default Tooltip
