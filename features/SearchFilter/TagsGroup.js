import { grey02, grey03 } from "constants/color"
import React from "react"
import styled, { css } from "styled-components"
import useSWR from "swr"

const TagsGroup = ({ tagIds, onChange = () => {} }) => {
  const { data } = useSWR(`/tags`)

  function toggleTagId(id) {
    const newTagIds = [...tagIds]
    const index = tagIds.indexOf(id)
    if (index === -1) {
      newTagIds.push(id)
    } else {
      newTagIds.splice(index, 1)
    }

    onChange('tagIds', newTagIds)
  }

  if (!data) return null

  return (
    <Container>
      <h3>標籤</h3>
      <TagList>
        {data.map(({ id, name, _primary }) => {
          const checked = tagIds.includes(id)
          return (
            <Tag key={id} checked={checked} onClick={() => toggleTagId(id)}>
              {name}
            </Tag>
          )
        })}
      </TagList>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 44px;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const Tag = styled.span`
  display: inline-block;
  height: 36px;
  padding: 0 16px;
  color: ${grey02};
  font-size: 16px;
  background-color: #ffffff;
  border: 1px solid ${grey03};
  border-radius: 12px;
  line-height: 36px;
  cursor: pointer;

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${grey02};
      border: 1px solid ${grey02};
      color: #ffffff;
    `}
`

export default TagsGroup
