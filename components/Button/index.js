import React from "react"
import styled, { css } from "styled-components"

const Button = ({ onClick, children, variant, width }) => {
  return (
    <Container onClick={onClick} variant={variant} width={width}>
      {children}
    </Container>
  )
}

const Container = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black01};
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.black01};
  background-color: #ffffff;
  cursor: pointer;
  ${({ width }) => width && `width: ${width}px;`}

  ${({ variant }) =>
    variant &&
    css`
      background-color: #000000;
      color: #ffffff;
    `}
`

export default Button
