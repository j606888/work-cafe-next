import { Box } from '@mui/material'
import React from 'react'

const Option = ({ children, isBlack=false }) => {
  if (isBlack) {
    return (
      <Box
        sx={{
          backgroundColor: "#757575",
          color: "#FFFFFF",
          borderRadius: 8,
          paddingY: 1,
          paddingX: 2,
        }}
      >
        {children}
      </Box>
    )  
  }
  return (
    <Box
      sx={{
        backgroundColor: "#EDEDED",
        color: "#757575",
        borderRadius: 8,
        paddingY: 1,
        paddingX: 2
      }}
    >
      {children}
    </Box>
  )
}

export default Option
