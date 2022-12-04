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
  flex-wrap: nowrap;
  overflow: hidden;
`

const Tag = styled.span`
  /* flex: 1; */
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #AFAAA3;
  border-radius: 12px;
  background-color: #F8F8F8;
  color: #42403F;
  font-size: 12px;
  font-weight: 400;
  font-family: 'Noto Sans', sans-serif;
`


export default TagList
