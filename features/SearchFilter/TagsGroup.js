import { Alert } from "@mui/material"
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
      <H3>店家特色</H3>
      <Alert severity="warning" sx={{ mb: 2 }}>目前評論數量不足，搭配關鍵字可能會因此找不到店家，還請多包涵。</Alert>
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

const H3 = styled.h3`
  margin-bottom: 12px !important;
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
  color: ${({ theme }) => theme.colors.black02};
  font-size: 16px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.grey01};
  border-radius: 12px;
  line-height: 36px;
  cursor: pointer;

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${({ theme }) => theme.colors.black02};
      border: 1px solid ${({ theme }) => theme.colors.black02};
      color: #ffffff;
    `}
`

export default TagsGroup
