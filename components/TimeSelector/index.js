import { Box, Grid, Stack, Typography } from "@mui/material"
import React from "react"
import Button from "./Button"
import SplitLine from "./SplitLine"

const TimeSelector = () => {
  return (
    <Box
      sx={{
        width: "320px",
        border: 1,
        borderRadius: 2,
        borderColor: "#757575",
        padding: 2,
      }}
    >
      <Typography variant="caption">套用標籤</Typography>
      <Stack direction="row" spacing={1}>
        <Button>不限時間</Button>
        <Button>營業中</Button>
      </Stack>
      <SplitLine />
      <Typography variant="caption">指定營業日</Typography>
      <Grid container spacing={1}>
        <Grid item><Button>週一</Button></Grid>
        <Grid item><Button>週二</Button></Grid>
        <Grid item><Button>週三</Button></Grid>
        <Grid item><Button>週四</Button></Grid>
        <Grid item><Button>週五</Button></Grid>
        <Grid item><Button>週六</Button></Grid>
        <Grid item><Button>週日</Button></Grid>
      </Grid>
    </Box>
  )
}

export default TimeSelector
