import React from "react"
import styled from "styled-components"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

const CarouselControls = ({ prev, next }) => {
  return (
    <div>
      <LeftButton onClick={prev}>
        <ChevronLeftIcon />
      </LeftButton>
      <RightButton onClick={next}>
        <ChevronRightIcon />
      </RightButton>
    </div>
  )
}

export const Button = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 32px;
  width: 32px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  border-radius: 50%;
  background-color: #eee;

  &:hover {
    background-color: #fff;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 28px;
    width: 28px;
  }
`

const LeftButton = styled(Button)`
  left: 20px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: 12px;
  }
`
const RightButton = styled(Button)`
  right: 20px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 12px;
  }
`

export default CarouselControls
