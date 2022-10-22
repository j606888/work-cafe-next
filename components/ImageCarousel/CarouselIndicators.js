import React from "react"
import styled from "styled-components"

const CarouselIndicators = ({ slides, currentIndex, switchIndex }) => {
  return (
    <Container>
      {slides.map((_, index) => (
        <Button
          key={index}
          active={currentIndex === index}
          onClick={() => switchIndex(index)}
        ></Button>
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 1.5rem;
  z-index: 2;
`

const Button = styled.button`
  width: 15px;
  height: 15px;
  border: none;
  background-color: #fff;
  opacity: 0.5;
  margin: 0.2em;
  border-radius: 50%;
  cursor: pointer;

  ${({ active }) => active && `opacity: 1`};
`

export default CarouselIndicators
