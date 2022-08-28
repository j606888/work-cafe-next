import React from "react"
import styled from "styled-components"
import Card from "../Card"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`

const CardList = ({ stores = [] }) => {
  return (
    <Container>
      {stores.map((store) => (
        <Card key={store.id} {...store} />
      ))}
    </Container>
  )
}

export default CardList
