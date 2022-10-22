import { useState } from "react"
import styled, { css } from "styled-components"
import CarouselControls from "./CarouselControls"
import CarouselIndicators from "./CarouselIndicators"
import CarouselItem from "./CarouselItem"

const ImageCarousel = ({ slides, width = 400, height = 300 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prev = () => {
    const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1
    setCurrentSlide(index)
  }

  const next = () => {
    const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0
    setCurrentSlide(index)
  }

  const switchIndex = (index) => {
    setCurrentSlide(index)
  }

  return (
    <Container width={width} height={height}>
      <CarouselInner currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <CarouselItem key={index} slide={slide} />
        ))}
      </CarouselInner>
      <CarouselControls prev={prev} next={next} />
      <CarouselIndicators
        slides={slides}
        currentIndex={currentSlide}
        switchIndex={switchIndex}
      />
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;

    & img {
      height: ${height}px;
    }
  `}
  position: relative;
`

const CarouselInner = styled.div`
  white-space: nowrap;
  transition: ease 0.6s;
  ${({ currentSlide }) => `
    transform: translateX(${-currentSlide * 100}%);
  `}
`

export default ImageCarousel
