import { Button, Grid } from '@mui/material'
import React from 'react'
import SearchStore from './SearchStore'
import TimeFilter from './TimeFilter'

const SearchBar = () => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <SearchStore />
      </Grid>
      <Grid item>
        <TimeFilter />
      </Grid>
      <Grid item sx={{ width: '120'}}>
        <Button variant="contained" sx={{witdh: '100%', backgroundColor: '#D9D9D9', color: '#FFF'}}>搜尋</Button>
      </Grid>
    </Grid>
  )
}

export default SearchBar
