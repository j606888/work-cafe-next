import React from 'react'
import {
  Grid,
  Stack,
  Skeleton as MuiSkeleton,
} from "@mui/material"

const Skeleton = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Stack spacing={1} sx={{ width: 210 }}>
        <MuiSkeleton variant="text" sx={{ fontSize: "1rem" }} />
        <MuiSkeleton variant="circular" width={40} height={40} />
        <MuiSkeleton variant="rectangular" width={210} height={60} />
        <MuiSkeleton variant="rounded" width={210} height={60} />
      </Stack>
    </Grid>
  )
}

export default Skeleton
