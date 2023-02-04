import { grey01, grey04 } from 'constants/color'
import { devices } from 'constants/styled-theme'
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
  color: ${grey01};

  @media ${devices.mobileXl} {
    border: none;

    span {
      display: none;
    }
  }

`

export default ActionButton
