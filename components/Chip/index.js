import React from "react"
import styled from "styled-components"

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;

  svg {
    color: #1a73e8;
    font-size: 18px;
  }

  span {
    font-size: 10px;
  }
`

const Chip = ({ children, text, onClick = () => {} }) => {
  return (
    <Container onClick={onClick}>
      {children}
      <span>{text}</span>
    </Container>
  )
}

export default Chip
