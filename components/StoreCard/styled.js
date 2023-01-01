import styled, { css } from "styled-components"
import { devices } from "constants/styled-theme"

export const ArrowContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eee;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
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

  @media ${devices.mobileXl} {
    width: 20px;
    height: 20px;
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

  @media ${devices.mobileXl} {
    width: 180px;
    height: 154px;

    ${ArrowContainer} {
      opacity: 1;
    }
  }
`

export const Img = styled.img`
  width: 240px;
  height: 240px;
  object-fit: cover;

  @media ${devices.mobileXl} {
    width: 180px;
    height: 154px;
  }
`

export const Slide = styled.div`
  opacity: 0;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      z-index: 1;
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
