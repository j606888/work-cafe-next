import React from "react"
import styled from "styled-components"
import Card from "./Card"

const Container = styled.div`
  height: 85vh;
  overflow-y: auto;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
`

const StoreSideList = ({ stores, onMouseEnter, onMouseLeave }) => {
  function handleMouseEnter(id) {
    if (onMouseEnter) onMouseEnter(id)
  }

  function handleMouseLeave(id) {
    if (onMouseLeave) onMouseLeave(id)
  }

  return (
    <Container>
      {stores.map((store) => (
        <Card
          key={store.id}
          {...store}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </Container>
  )
}

export default StoreSideList
