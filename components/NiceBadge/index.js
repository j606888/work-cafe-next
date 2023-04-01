import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from '@mui/material'

const NiceBadge = ({ number=0, className }) => {
  const fullScreen = useMediaQuery('(max-width: 720px)')
  const src = fullScreen ? '/v2/badge-nice-small.svg' : '/v2/badge-nice-large.svg'

  return (
    <Container className={className}>
      <img src={src} alt="nice" />
      <span>{ number }</span>
    </Container>
  )
}

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.green01};
  border-radius: 24px;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 8px 0 4px;
  height: 24px;

  span {
    font-size: 14px;
    font-weight: 700;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 20px;

    span {
      font-size: 11px;
    }
  }
`

export default NiceBadge
