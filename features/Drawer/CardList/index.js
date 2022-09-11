import React from "react"
import styled from "styled-components"
import Card from "../Card"

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
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
