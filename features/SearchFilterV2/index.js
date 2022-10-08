import React from "react"
import styled from "styled-components"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material"
import { useState } from "react"
import OpenTimePicker from "components/OpenTimePicker"
import { useMemo } from "react"
import RecommendBlock from "features/ReviewForm/RecommendBlock"
import ReviewFilters from "./ReviewFilters"
import _ from "lodash"

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
  openType: "NONE",
  openWeek: 0,
  openHour: 99,
  recommend: null,
  roomVolume: "",
  timeLimit: "",
  socketSupply: "",
  wakeUp: false,
}

const SearchFilterV2 = ({ onChange = () => {} }) => {
  const [open, setOpen] = useState(false)
  const [settingsMemo, setSettingsMemo] = useState(INIT_FILTERS)
  const [settings, setSettings] = useState(INIT_FILTERS)
  const badgeCount = useMemo(
    () => _calcBadgeCount(settingsMemo),
    [settingsMemo]
  )

  const handleClose = () => {
    setOpen(false)
    setSettings(settingsMemo)
  }

  const handleReset = () => {
    setSettings(INIT_FILTERS)
  }

  const handleApply = () => {
    setSettingsMemo(settings)
    onChange(_filterCleanSettings(settings))
    setOpen(false)
  }

  const handleOpenTimeChange = ({ openType, openWeek, openHour }) => {
    setSettings((cur) => ({ ...cur, openType, openWeek, openHour }))
  }

  const handleRecommendChange = (recommend) => {
    if (settings.recommend === recommend) {
      setSettings((cur) => ({ ...cur, recommend: null }))
    } else {
      setSettings((cur) => ({ ...cur, recommend }))
    }
  }

  const handleReviewFilterChange = (key, value) => {
    if (settings[key] === value) {
      setSettings((cur) => ({ ...cur, [key]: "" }))
    } else {
      setSettings((cur) => ({ ...cur, [key]: value }))
    }
  }

  const handleWakeUpChange = (e) => {
    setSettings((cur) => ({ ...cur, wakeUp: e.target.checked }))
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
          <RecommendBlock
            onChange={handleRecommendChange}
            recommend={settings.recommend}
          />
          <ReviewFilters {...settings} onChange={handleReviewFilterChange} />
          <Divider />
          <p>進階</p>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.wakeUp}
                  onChange={handleWakeUpChange}
                />
              }
              label="只顯示有評論的店家"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>重回預設</Button>
          <Box style={{ flex: "1 0 0", textAlign: "right" }}>
            <Button variant="contained" onClick={handleApply}>
              套用
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SearchFilterV2

function _calcBadgeCount(settingsMemo) {
  let i = 0
  ;[
    "recommend",
    "roomVolume",
    "timeLimit",
    "socketSupply",
    "wakeUp",
  ].forEach((key) => {
    if (settingsMemo[key] !== INIT_FILTERS[key]) {
      i++
    }
  })

  if (settingsMemo.openType !== "NONE") {
    i++
  }

  return i
}

function _filterCleanSettings(settings) {
  const result = {}

  result.openType = settings.openType
  if (settings.openType === "OPEN_AT") {
    result.openWeek = settings.openWeek
    if (settings.openHour !== 99) {
      result.openHour = settings.openHour
    }
  }
  if (settings.recommend) {
    result.recommend = settings.recommend
  }

  if (settings.roomVolume !== "") {
    result.roomVolume = settings.roomVolume
  }
  if (settings.timeLimit !== "") {
    result.timeLimit = settings.timeLimit
  }
  if (settings.socketSupply !== "") {
    result.socketSupply = settings.socketSupply
  }
  if (!!settings.wakeUp) {
    result.wakeUp = settings.wakeUp
  }

  return result
}
