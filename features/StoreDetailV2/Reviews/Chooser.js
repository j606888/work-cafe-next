import React, { useState } from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  position: relative;
`

const WordButton = styled.button`
  flex: 1;
  box-sizing: border-box;
  border: none;
  background: none;
  font-size: 16px;
  position: relative;
  padding: 8px;
  cursor: pointer;
  color: #999;
  border-bottom: 2px solid #ddd;

  ${({ active }) =>
    active &&
    css`
      font-weight: 500;
      color: #757575;
      border-bottom: 2px solid #757575;
      z-index: 1;
    `}
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
    </Container>
  )
}

export default Chooser
