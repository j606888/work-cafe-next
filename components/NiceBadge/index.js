import React from 'react'
import styled from 'styled-components'

const index = ({ number=0, className }) => {
  return (
    <Container className={className}>
      <img src="/nice.svg" alt="nice" />
      <span>{ number }</span>
    </Container>
  )
}

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #FFFFFF;
  background: #FFA233;
  border-radius: 24px;
  color: #FFFFFF;
  padding: 0 8px 0 4px;

  span {
    font-size: 11px;
    font-weight: 700;
  }
`

export default index
