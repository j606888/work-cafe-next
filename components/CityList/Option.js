import { Box } from '@mui/material'
import React from 'react'

const Option = ({ children, isBlack=false }) => {
  const defaultStyle = {
    borderRadius: 8,
    paddingY: 1,
    paddingX: 2,
    backgroundColor: "#EDEDED",
    color: "#757575",
  }
  if (isBlack) {
    defaultStyle['backgroundColor'] = "#757575"
    defaultStyle['color'] = '#FFFFFF'
  }

  return (
    <Box
      sx={defaultStyle}
    >
      {children}
    </Box>
  )
}

export default Option
