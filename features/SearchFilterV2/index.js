import React from "react"
import styled from "styled-components"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import OpenTimePicker from "components/OpenTimePicker"
import { useMemo } from "react"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`

const INIT_FILTERS = {
  openType: 'NONE',
  openWeek: 0,
  openHour: 99,
}

const SearchFilterV2 = ({ onChange = () => {}}) => {
  const [open, setOpen] = useState(false)
  const [settingsMemo, setSettingsMemo] = useState(INIT_FILTERS)
  const [settings, setSettings] = useState(INIT_FILTERS)
  const badgeCount = useMemo(() => {
    let i = 0
    if (settingsMemo.openType !== 'NONE') {
      i++
    }

    return i
  }, [settingsMemo])

  const handleClose = () => {
    setOpen(false)
    setSettings(settingsMemo)
  }

  const handleReset = () => {
    setSettings(INIT_FILTERS)
  }

  const handleApply = () => {
    setSettingsMemo(settings)
    onChange(settings)
    setOpen(false)
  }

  const handleOpenTimeChange = ({ openType, openWeek, openHour }) => {
    setSettings(cur => ({ ...cur, openType, openWeek, openHour }))
  }

  return (
    <>
      <Badge badgeContent={badgeCount} color="primary">
        <Container onClick={() => setOpen(true)}>
          篩選
          <FilterAltIcon />
        </Container>
      </Badge>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>篩選</DialogTitle>
        <DialogContent>
          <OpenTimePicker {...settings} onChange={handleOpenTimeChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>重回預設</Button>
          <Button variant="outlined" onClick={handleClose}>取消</Button>
          <Button variant="contained" onClick={handleApply}>套用</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SearchFilterV2
