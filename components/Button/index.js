import { grey01 } from "constants/color"
import React from "react"
import styled, { css } from "styled-components"

const Button = ({ onClick, children, variant }) => {
  return (
    <Container onClick={onClick} variant={variant}>
      {children}
    </Container>
  )
}

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${grey01};
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${grey01};
  background-color: #ffffff;
  cursor: pointer;

  ${({ variant }) =>
    variant &&
    css`
      background-color: #000000;
      color: #ffffff;
    `}
`

export default Button
