import { Chip } from "@mui/material"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 1rem 0;

  p {
    margin: 0 0 1rem 0;
    color: #555;
  }
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const TagsPicker = ({ tags = [], selectedTagIds = [], primary = false, onClick }) => {
  const targetTags = tags.filter(tag => tag.primary === primary)

  const handleClick = (tagId) => {
    onClick(tagId)
  }

  return <Container>
    <p>標籤（至少 3 人以上給予）</p>
    <TagsContainer>
      {targetTags.map(tag => (
        <Chip
          key={tag.id}
          label={tag.name}
          color="primary"
          onClick={() => handleClick(tag.id)}
          variant={_variant(selectedTagIds, tag.id)}
        />
      ))}
    </TagsContainer>
  </Container>
}

function _variant(tagIds, id) {
  return tagIds.includes(id) ? "contained" : "outlined"
}

export default TagsPicker
