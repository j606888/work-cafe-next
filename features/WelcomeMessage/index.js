import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 75%;
  margin: 0 auto;
  text-align: center;
`

const WelcomeMessage = () => {
  return (
    <Container>
      <h3>Work Cafe 幫你即時篩選  能靜心做事的咖啡店</h3>
      <p>這是一個剛起步的網站，如果大家能夠幫忙建立評論就太感謝了</p>
      <p>隨著評論數的增加我們也可以增加一些更實用的功能。</p>
    </Container>
  )
}

export default WelcomeMessage
