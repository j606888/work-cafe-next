import { grey03 } from 'constants/color'
import { devices } from 'constants/styled-theme'
import React from 'react'
import styled from 'styled-components'

const OrDivider = () => {
  return (
    <Container>
      <Line />
      <Or>或</Or>
      <Line />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${grey03};
  height: 80px;

  @media ${devices.mobileXl} {
    height: 64px;
  }
`

const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${grey03};
`

const Or = styled.span`
  margin: 0 12px;
`

export default OrDivider
