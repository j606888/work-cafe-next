import { useState } from "react"
import styled, { css } from "styled-components"
import CarouselControls, { Button } from "./CarouselControls"
import CarouselIndicators from "./CarouselIndicators"
import CarouselItem from "./CarouselItem"
import { devices } from "constant/styled-theme"

const ImageCarousel = ({
  slides,
  width = 400,
  height = 300,
  mWidth = 180,
  mHeight = 154,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prev = (e) => {
    e.stopPropagation()
    const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1
    setCurrentSlide(index)
  }

  const next = (e) => {
    e.stopPropagation()
    const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0
    setCurrentSlide(index)
  }

  const switchIndex = (e, index) => {
    e.stopPropagation()
    setCurrentSlide(index)
  }

  return (
    <Container width={width} height={height} mWidth={mWidth} mHeight={mHeight}>
      <CarouselInner currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <CarouselItem key={index} slide={slide} />
        ))}
      </CarouselInner>
      {slides.length > 1 && (
        <>
          <CarouselControls prev={prev} next={next} />
          <CarouselIndicators
            slides={slides}
            currentIndex={currentSlide}
            switchIndex={switchIndex}
          />
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  border-radius: 12px;

  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;

    & img {
      height: ${height}px;
    }
  `}

  ${Button} {
    opacity: 0;
    transition: 200ms;
  }

  &:hover ${Button} {
    opacity: 1;
  }

  @media ${devices.mobileXl} {
    ${({ mWidth, mHeight }) => css`
      width: ${mWidth}px;
      height: ${mHeight}px;

      & img {
        height: ${mHeight}px;
      }
    `}

    ${Button} {
      opacity: 1;
    }
  }
`

const CarouselInner = styled.div`
  white-space: nowrap;
  transition: transform 0.6s ease;
  ${({ currentSlide }) => `
    transform: translateX(${-currentSlide * 100}%);
  `}
`

export default ImageCarousel
