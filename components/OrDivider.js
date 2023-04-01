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
  color: ${({ theme }) => theme.colors.grey01};
  height: 80px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 64px;
  }
`

const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.grey01};
`

const Or = styled.span`
  margin: 0 12px;
`

export default OrDivider
