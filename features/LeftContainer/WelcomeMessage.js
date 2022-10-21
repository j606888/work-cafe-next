import React from 'react'
import styled from 'styled-components'
import { devices } from 'constant/styled-theme'

const WelcomeMessage = () => {
  return (
    <Container>
      <h3>不只是咖啡廳，還要適合辦公的咖啡廳！</h3>
      <p>透過串連 Google Map，以及我們自定義的篩選。</p>
      <p>讓你快速找到理想的店家。</p>
    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  max-width: 560px;
  margin: 6rem auto;
  text-align: left;
  font-family: 'Noto Sans', sans-serif;
  color: #757575;

  h3 {
    font-size: 20px;
  }

  p {
    line-height: 170%;
    font-weight: 400;
    margin: 0;
    font-size: 14px;
  }

  span {
    font-size: 12px;
  }

  @media ${devices.iphoneSE} {
    display: none;
  }
`

export default WelcomeMessage
