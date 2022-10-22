import React from "react"
import styled from "styled-components"

const CarouselIndicators = ({ slides, currentIndex, switchIndex }) => {
  return (
    <Container>
      {slides.map((_, index) => (
        <Button
          key={index}
          active={currentIndex === index}
          onClick={(e) => switchIndex(e, index)}
        ></Button>
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 1rem;
  z-index: 2;
`

const Button = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border: none;
  background-color: #fff;
  opacity: 0.5;
  margin: 0.2em;
  border-radius: 50%;
  cursor: pointer;

  ${({ active }) => active && `opacity: 1`};
`

export default CarouselIndicators
