import { selectedTagIdsStore } from "features/SearchFilter/FilterForm"
import React from "react"
import styled from "styled-components"

const TagList = ({ tags = [], withCount = true, className, fixedHeight=false }) => {
  const { selectedTagIds } = selectedTagIdsStore((state) => ({
    selectedTagIds: state.selectedTagIds,
  }))

  tags.sort((x, y) => {
    const xIndex = selectedTagIds.indexOf(x.id)
    const yIndex = selectedTagIds.indexOf(y.id)

    if (xIndex === -1 && yIndex === -1) {
      return x.id - y.id
    } else if (xIndex === -1) {
      return 1
    } else if (yIndex === -1) {
      return -1
    } else {
      return xIndex - yIndex
    }
  })


  if (withCount) {
    return (
      <Container className={className} fixedHeight={fixedHeight}>
        {tags.map((tag, index) => (
          <Tag key={index}>
            {tag.name} ({tag.count})
          </Tag>
        ))}
      </Container>
    )
  } else {
    return (
      <Container fixedHeight={fixedHeight}>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  height: ${({ fixedHeight }) => (fixedHeight ? "32px" : "auto")};
  overflow: hidden;
`

const Tag = styled.span`
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #afaaa3;
  border-radius: 12px;
  background-color: #f8f8f8;
  color: #42403f;
  font-size: 12px;
  font-weight: 400;
`

export default TagList
