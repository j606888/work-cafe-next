import React, { useState } from "react"
import styled, { css } from "styled-components"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useEffect } from "react"

const ArrowContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eee;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ left, right }) => {
    if (left) return `left: 20px;`
    if (right) return `right: 20px;`
  }}

  &:hover {
    cursor: pointer;
    background-color: #fff;
  }
`

const Container = styled.div`
  position: relative;
  width: 280px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  ${ArrowContainer} {
    opacity: 0;
    transition: 200ms;
  }

  &:hover ${ArrowContainer} {
    display: flex;
    opacity: 1;
  }
`

const Img = styled.img`
  width: 280px;
  height: 250px;
  object-fit: cover;
`

const Slide = styled.div`
  opacity: 0;
  transition: 200ms opacity ease-in-out;
  transition-delay: 200ms;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      z-index: 1;
      transition-delay: 0ms;
    `}
`

const DotsContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 5;
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  z-index: 5;

  &:hover {
    cursor: pointer;
    background-color: #fff;
  }

  ${({ active }) => active && `background-color: #fff;`}
`

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
            {index === current && <Img src={image} alt="xxx" />}
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
