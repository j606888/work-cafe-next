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
} from "@mui/material"
import { useState } from "react"
import OpenTimePicker from "features/SearchFilter/OpenTimePicker"
import { useMemo } from "react"
import _ from "lodash"
import useSWR from "swr"
import TagsPicker from "./TagsPicker"
import AdvancedPicker from "./AdvancedPicker"
import { devices } from "constant/styled-theme"
import useFilterStore from "stores/useFilterStore"
import { useEffect } from "react"

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  padding: 0 18px;
  background-color: #fff;
  color: #757575;
  border: 1px solid #757575;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
  @media ${devices.iphoneSE} {
    display: none;
  }
`

const SmallContainer = styled(Container)`
  display: none;
  width: 44px;
  height: 44px;

  @media ${devices.iphoneSE} {
    display: flex;
  }
`

const INIT_FILTERS = {
  openType: "NONE",
  openWeek: 0,
  openHour: 99,
  recommend: null,
  wakeUp: false,
  reviewOver: false,
  tagIds: [],
}

const SearchFilter = ({ onChange = () => {} }) => {
  const [open, setOpen] = useState(false)
  const filters = useFilterStore(state => state.filters)
  const setFilters = useFilterStore(state => state.setFilters)
  const [settingsMemo, setSettingsMemo] = useState(filters)
  const [settings, setSettings] = useState(filters)
  const { data: tags } = useSWR("/tags")
  const badgeCount = useMemo(
    () => _calcBadgeCount(settingsMemo),
    [settingsMemo]
  )

  const handleClose = () => {
    setOpen(false)
    setSettings(settingsMemo)
    setFilters(settingsMemo)
  }

  const handleReset = () => {
    setSettings(INIT_FILTERS)
    setFilters(settings)
  }

  const handleApply = () => {
    setSettingsMemo(settings)
    setFilters(settings)
    onChange(_filterCleanSettings(settings))
    setOpen(false)
  }

  const handleOpenTimeChange = ({ openType, openWeek, openHour }) => {
    setSettings((cur) => ({ ...cur, openType, openWeek, openHour }))
  }

  const handleClick = (tagId) => {
    setSettings((cur) => {
      if (cur.tagIds.includes(tagId)) {
        const tagIds = cur.tagIds.filter((id) => id !== tagId)
        return { ...cur, tagIds }
      } else {
        return { ...cur, tagIds: [...cur.tagIds, tagId] }
      }
    })
  }

  const handleAdvanceChange = (label, checked) => {
    setSettings((cur) => ({ ...cur, [label]: checked }))
  }

  return (
    <>
      <Badge badgeContent={badgeCount} color="primary">
        <Container onClick={() => setOpen(true)}>
          篩選條件
        </Container>
        <SmallContainer onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </SmallContainer>
      </Badge>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>篩選</DialogTitle>
        <DialogContent>
          <OpenTimePicker {...settings} onChange={handleOpenTimeChange} />
          <Divider />
          <TagsPicker
            tags={tags}
            primary
            selectedTagIds={settings.tagIds}
            onClick={handleClick}
          />
          <Divider />
          <AdvancedPicker
            wakeUp={settings.wakeUp}
            reviewOver={settings.reviewOver}
            onChange={handleAdvanceChange}
          />
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

export default SearchFilter

function _calcBadgeCount(settingsMemo) {
  let i = 0
  ;["recommend", "wakeUp", "reviewOver"].forEach((key) => {
    if (settingsMemo[key] !== INIT_FILTERS[key]) {
      i++
    }
  })
  if (settingsMemo.openType !== "NONE") i++
  i += settingsMemo.tagIds.length

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

  if (settings.recommend) result.recommend = settings.recommend
  if (!!settings.wakeUp) result.wakeUp = settings.wakeUp
  if (!!settings.reviewOver) result.reviewOver = settings.reviewOver
  if (settings.tagIds.length !== 0) result.tagIds = settings.tagIds

  return result
}
