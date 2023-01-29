import { Button, ButtonGroup } from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useSWR from "swr"
import TagsPicker from 'features/SearchFilter/TagsPicker'

const Filter = ({ onClose, setFilterCount }) => {
  const router = useRouter()
  const storedFilters = JSON.parse(localStorage.getItem("filters"))
  const [wakeUp, setWakeUp] = useState(storedFilters?.wakeUp || false)
  const [tagIds, setTagIds] = useState(storedFilters?.tagIds || [])
  const { data: tags } = useSWR("/tags")

  useEffect(() => {
    let count = 0
    if (wakeUp) count++
    count += tagIds.length
    setFilterCount(count)
  }, [wakeUp, setFilterCount, tagIds])

  useEffect(() => {
    const query = { wakeUp, tagIds }
    localStorage.setItem("filters", JSON.stringify({ wakeUp }))
    const pathWithoutQuery = router.asPath.split("?")[0]
    router.push({ pathname: pathWithoutQuery, query })
  }, [wakeUp, setFilterCount, tagIds])

  function handleToggleTag(tagId) {
    const newTagIds = [...tagIds]
    _toggleTag(newTagIds, tagId)
    setTagIds(newTagIds)
  }

  return (
    <Container>
      <h3>篩選條件</h3>
      <label>
        <input
          type="checkbox"
          checked={wakeUp}
          onChange={() => setWakeUp(!wakeUp)}
        />
        只顯示有評論的店家
      </label>
      <br />
      <TagsPicker
        tags={tags}
        onClick={handleToggleTag}
        selectedTagIds={tagIds}
      />
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

const Container = styled.div`
  /* width: 640px; */
  padding: 24px;
`

export default Filter
