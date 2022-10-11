import styled, { css } from "styled-components"
import { devices } from "constant/styled-theme"

export const ArrowContainer = styled.div`
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

export const Container = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
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

  @media ${devices.iphoneSE} {
    width: 154px;
    height: 154px;
  }
`

export const Img = styled.img`
  width: 240px;
  height: 240px;
  object-fit: cover;

  @media ${devices.iphoneSE} {
    width: 154px;
    height: 154px;
  }
`

export const Slide = styled.div`
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

export const DotsContainer = styled.div`
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

export const Dot = styled.div`
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
