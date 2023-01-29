import { Button, ButtonGroup } from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useSWR from "swr"
import TagsPicker from "features/SearchFilter/TagsPicker"
import OpenTimePicker from "features/SearchFilter/OpenTimePicker"

const Filter = ({ onClose, setFilterCount }) => {
  const router = useRouter()
  const storedFilters = JSON.parse(localStorage.getItem("filters"))
  const [wakeUp, setWakeUp] = useState(storedFilters?.wakeUp || false)
  const [tagIds, setTagIds] = useState(storedFilters?.tagIds || [])
  const [openTime, setOpenTime] = useState({
    openType: storedFilters.openType || "NONE",
    openWeek: storedFilters.openWeek || 0,
    openHour: storedFilters.openHour || 99,
  })
  const { data: tags } = useSWR("/tags")

  useEffect(() => {
    let count = 0
    if (wakeUp) count++
    if (openTime.openType !== "NONE") count++
    count += tagIds.length
    setFilterCount(count)
  }, [wakeUp, setFilterCount, tagIds, openTime])

  useEffect(() => {
    const { openType, openWeek, openHour } = openTime
    let query = { wakeUp, tagIds, openType, openWeek, openHour }
    query = _filterCleanSettings(query)
    localStorage.setItem("filters", JSON.stringify(query))
    const pathWithoutQuery = router.asPath.split("?")[0]
    router.push({ pathname: pathWithoutQuery, query })
  }, [wakeUp, setFilterCount, tagIds, openTime])

  function handleToggleTag(tagId) {
    const newTagIds = [...tagIds]
    _toggleTag(newTagIds, tagId)
    setTagIds(newTagIds)
  }

  function handleOpenTimeChange(options) {
    setOpenTime(options)
  }

  return (
    <Container>
      <h3>篩選條件</h3>
      <OpenTimePicker {...openTime} onChange={handleOpenTimeChange} />
      <TagsPicker
        tags={tags}
        onClick={handleToggleTag}
        selectedTagIds={tagIds}
      />
      <label>
        <input
          type="checkbox"
          checked={wakeUp}
          onChange={() => setWakeUp(!wakeUp)}
        />
        只顯示有評論的店家
      </label>
      <br />
      <ButtonGroup>
        <Button>儲存</Button>
        <Button onClick={onClose}>關閉</Button>
      </ButtonGroup>
    </Container>
  )
}

function _toggleTag(tagIds, tagId) {
  const index = tagIds.indexOf(tagId)
  if (index === -1) {
    tagIds.push(tagId)
  } else {
    tagIds.splice(index, 1)
  }
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

const Container = styled.div`
  /* width: 640px; */
  padding: 24px;
`

export default Filter
