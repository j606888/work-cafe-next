import React, { useState } from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import {
  ArrowContainer,
  Container,
  Img,
  Slide,
  DotsContainer,
  Dot,
} from "./styled"

const ImageSlider = ({ images = [] }) => {
  const [current, setCurrent] = useState(0)
  const length = images.length

  const nextSlide = (e) => {
    e.stopPropagation()
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  const prevSlide = (e) => {
    e.stopPropagation()
    setCurrent(current === 0 ? length - 1 : current - 1)
  }
  const handleClick = (e, index) => {
    e.stopPropagation()
    setCurrent(index)
  }

  if (length === 0 || images[0] === null)
    return (
      <Container>
        <Slide active>
          <Img src="/no-egg.png" alt="no photo" />
        </Slide>
      </Container>
    )

  if (length === 1)
    return (
      <Container>
        <Slide active>
          <Img src={images[0]} alt="store" />
        </Slide>
      </Container>
    )

  return (
    <Container>
      <ArrowContainer left>
        <ChevronLeftIcon onClick={prevSlide} />
      </ArrowContainer>
      <ArrowContainer right>
        <ChevronRightIcon onClick={nextSlide} />
      </ArrowContainer>

      {images.map((image, index) => {
        return (
          <Slide key={index} active={index === current}>
            {index === current && <Img src={image} alt="store" />}
          </Slide>
        )
      })}
      <DotsContainer>
        {images.map((_image, index) => {
          return (
            <Dot
              key={index}
              active={index === current}
              onClick={(e) => handleClick(e, index)}
            />
          )
        })}
      </DotsContainer>
    </Container>
  )
}

export default ImageSlider
