import React from 'react'
import styled from 'styled-components'
import Card from './Card'

const Container = styled.div`
  height: 85vh;
  overflow-y: auto;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
`

const StoreSideList = ({stores}) => {
  return (
    <Container>
      {stores.map((store) => (
        <Card key={store.id} {...store} />
      ))}
    </Container>
  )
}

export default StoreSideList
