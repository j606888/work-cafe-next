import React from "react"
import styled from "styled-components"

const CarouselControls = ({ prev, next }) => {
  return (
    <div>
      <LeftButton onClick={prev}>Prev</LeftButton>
      <RightButton onClick={next}>Next</RightButton>
    </div>
  )
}

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  display: inline-block;
  position: absolute;
  height: 50px;
  width: 70px;
  top: calc(50% - 25px);
  color: #f3f3f3;
  cursor: pointer;
`

const LeftButton = styled(Button)`
  left: 0;
`
const RightButton = styled(Button)`
  right: 0;
`

export default CarouselControls
