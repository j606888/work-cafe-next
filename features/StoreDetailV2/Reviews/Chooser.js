import React, { useState } from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
  display: inline-flex;
  gap: 2rem;
  box-sizing: border-box;
  position: relative;
`

const WordButton = styled.button`
  box-sizing: border-box;
  border: none;
  background: none;
  font-size: 16px;
  position: relative;
  padding: 8px 0;
  cursor: pointer;
  color: #757575;
  border-bottom: 2px solid #ddd;

  ${({ active }) =>
    active &&
    css`
      font-weight: 500;
      border-bottom: 2px solid #757575;
      z-index: 1;
    `}
`

const BottomLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 2px solid #ddd;
`

const Chooser = ({ onChange }) => {
  const [active, setActive] = useState("workCafe")

  function handleClick(newActive) {
    setActive(newActive)
    onChange(newActive)
  }

  return (
    <Container>
      <WordButton
        active={active === "workCafe"}
        onClick={() => handleClick("workCafe")}
      >
        Work Cafe 評論
      </WordButton>
      <WordButton
        active={active === "googleMap"}
        onClick={() => handleClick("googleMap")}
      >
        Google Map 評論
      </WordButton>
      <BottomLine />
    </Container>
  )
}

export default Chooser
