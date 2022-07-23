import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const StoreBox = () => {
  return (
    <Stack direction='row'>
      <Stack direction="column" alignItems="center">
        <Box
          sx={{
            width: 168,
            height: 168,
            borderRadius: 2,
            borderColor: "#757575",
            borderStyle: "solid",
            borderWidth: 1,
            marginBottom: 1.6
          }}
        ></Box>
        <Typography variant="body1" component="h5" fontWeight="bold">
          興波咖啡旗艦店
        </Typography>
        <Typography variant="body2" component="p">
          台北市大同區・153人推薦
        </Typography>
      </Stack>
    </Stack>
  )
}

export default StoreBox
