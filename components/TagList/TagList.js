import React from "react"
import styled from "styled-components"

const TagList = ({ tags = [], withCount = true }) => {
  if (withCount) {
    return (
      <Container>
        {tags.map((tag, index) => (
          <Tag key={index}>
            {tag.name} ({tag.count})
          </Tag>
        ))}
      </Container>
    )
  } else {
    return (
      <Container>
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
  flex-wrap: nowrap;
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
  font-family: "Noto Sans", sans-serif;
`

export default TagList
