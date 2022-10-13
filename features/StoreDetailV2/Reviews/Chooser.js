import React, { useState } from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
  display: flex;
  gap: 2rem;
`

const WordButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  position: relative;
  padding: 8px 0;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }

  ${({ active }) =>
    active &&
    css`
      font-weight: 500;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2px;
        border-bottom: 2px solid #757575;
      }
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
