import React, { useState } from 'react'
import { Dialog, useMediaQuery } from '@mui/material'
import styled from 'styled-components'
import Filter from './Filter'
import { grey04, orange100 } from 'constants/color'
import { devices } from 'constants/styled-theme'

const SearchFilterV2 = () => {
  const fullScreen = useMediaQuery(devices.mobileXl)

  const [open, setOpen] = useState(false)
  const [filterCount, setFilterCount] = useState(0)

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <img src="/filter.svg" alt="filter" />
        篩選條件
        {filterCount > 0 && <Badge>{filterCount}</Badge>}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={fullScreen}
      >
        <Filter
          onClose={() => setOpen(false)}
          setFilterCount={setFilterCount}
        />
      </Dialog>
    </>
  )
}

const Button = styled.div`
  width: 140px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 20px;
  border: 1px solid ${grey04};
  font-size: 16px;
  flex-shrink: 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.04));
  cursor: pointer;
  position: relative;
  background-color: #FFFFFF;

  img {
    width: 36px;
    height: 36px;
  }
`

const Badge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  background-color: ${orange100};
  border-radius: 50%;
  width: 24px;
  height: 24px;
`

export default SearchFilterV2
