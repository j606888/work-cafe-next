import React from "react"
import styled from "styled-components"

const TagList = ({ tags = [] }) => {
  return (
    <Container>
      {tags.map((tag, index) => (
        <Tag key={index}>
          {tag.name} ({tag.count})
        </Tag>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`

const Tag = styled.span`
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border: 1px solid #757575;
  border-radius: 12px;
  color: #757575;
  font-size: 12px;
`


export default TagList
