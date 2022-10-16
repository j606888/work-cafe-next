import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"

const Container = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;

  @media ${devices.iphoneSE} {
    display: none;
    /* flex-wrap: nowrap;
    overflow: hidden;

    & > span {
      white-space: nowrap;
    } */
  }
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

const MOCK_TAGS = [
  {
    name: "有插座",
    count: 3,
  },
  {
    name: "無限時",
    count: 3,
  },
]

const TagList = ({ tags = MOCK_TAGS }) => {
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

export default TagList
