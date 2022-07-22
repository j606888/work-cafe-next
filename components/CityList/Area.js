import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Button from '../TimeSelector/Button'
import Option from './Option'
import StoreBox from './StoreBox'

const Area = () => {
  return (
    <Box mb={7}>
      <Stack direction="row" mb={3}>
        <Stack
          direction="row"
          alignItems="flex-end"
          spacing={2}
          sx={{ flexGrow: 1 }}
        >
          <Typography
            variant="h2"
            component="h4"
            sx={{ color: "#D9D9D9" }}
            fontWeight="bold"
          >
            北
          </Typography>
          <Option isBlack={true}>台北</Option>
          <Option>基隆</Option>
          <Option>桃園</Option>
          <Option>新竹</Option>
          <Option>苗栗</Option>
        </Stack>
        <Typography variant="body1" component="a">
          更多 台北咖啡店
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3}>
        <StoreBox />
        <StoreBox />
        <StoreBox />
        <StoreBox />
        <StoreBox />
      </Stack>
    </Box>
  )
}

export default Area
