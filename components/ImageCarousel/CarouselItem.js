import React from 'react'
import styled from 'styled-components'

const CarouselItem = ({ slide }) => {
  return (
    <Container>
      <img src={slide} alt='image' />
    </Container>
  )
}

const Container = styled.div`
  display: inline-block;
  width: 100%;

  img {
    width: 100%;
    object-fit: cover;
  }
`

export default CarouselItem
