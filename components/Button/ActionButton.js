import { grey01, grey04 } from 'constants/color'
import React from 'react'
import styled from 'styled-components'

const ActionButton = ({ svg, onClick, children }) => {
  return (
    <Container onClick={onClick}>
      <img src={`/${svg}.svg`} alt={svg} />
      <span>{children}</span>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid ${grey04};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 12px 0 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black01};
  &:hover {
    background-color: #f5f5f5;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border: none;

    span {
      display: none;
    }
  }
`

export default ActionButton
