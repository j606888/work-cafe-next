import React from "react"
import styled from "styled-components"

const Option = ({ onClick, children }) => {
  return (
    <Container onClick={onClick}>
      <span>{children}</span>
    </Container>
  )
}

const Container = styled.div`
  color: #222120;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ focus }) => focus && `background-color: #f2f2f2;`}

  span {
    white-space: pre;
  }

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`


export default Option
