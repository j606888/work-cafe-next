import { Box, Container, Typography } from "@mui/material"
import React from "react"
import Area from "./Area"

const CityList = () => {
  return (
    <Box py={10}>
      <Container maxWidth="md">
        <Typography variant="h5" component="h3" fontWeight="bold" mb={1}>
          縣市快搜
        </Typography>
        <Typography variant="body1" component="p" mb={2}>
          等你探索 各縣市的讚讚工作咖啡店
        </Typography>
        <Area />
        <Area />
        <Area />
        <Area />
      </Container>
    </Box>
  )
}

export default CityList
