import React from "react"
import styled from "styled-components"
import Card from "../Card"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 56px;
`

const CardList = ({ stores = [], onClick = () => {} }) => {
  function handleOnClick(placeId) {
    onClick(placeId)
  }

  return (
    <Container>
      {stores.map((store) => (
        <Card key={store.placeId} {...store} onClick={handleOnClick}/>
      ))}
    </Container>
  )
}

export default CardList
