import { grey06, orange100 } from 'constants/color'
import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from '@mui/material'
import { devices } from 'constants/styled-theme'

const NiceBadge = ({ number=0, className }) => {
  const fullScreen = useMediaQuery(devices.mobileXl)
  const src = fullScreen ? '/nice-small.svg' : '/nice-large.svg'

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
  border: 1px solid ${grey06};
  background: ${orange100};
  border-radius: 24px;
  color: ${grey06};
  padding: 0 8px 0 4px;
  height: 24px;

  span {
    font-size: 14px;
    font-weight: 700;
  }

  @media ${devices.mobileXl} {
    height: 20px;

    span {
      font-size: 11px;
    }
  }
`

export default NiceBadge
