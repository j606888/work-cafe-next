import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const SplitLine = () => {
  return (
    <Grid container alignItems="center" justifyContent="center" spacing={0.5}>
      <Grid item xs={5.5}>
        <Box sx={{ height: 1, border: 0.5, color: "#D9D9D9" }} />
      </Grid>
      <Grid item xs={1} sx={{ textAlign: "center" }}>
        <Typography
          sx={{ color: "#D9D9D9", textAlign: "center" }}
          variant="caption"
        >
          或
        </Typography>
      </Grid>
      <Grid item xs={5.5}>
        <Box sx={{ height: 1, border: 0.5, color: "#D9D9D9" }} />
      </Grid>
    </Grid>
  )
}

export default SplitLine
