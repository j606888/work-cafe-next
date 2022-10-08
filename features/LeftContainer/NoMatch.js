import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  color: #333;

  h3 {
    font-size: 36px;
    margin: 1rem;
  }

  p {
    font-size: 18px;
    margin: 0.3rem;
  }
`

const Img = styled.img`
  margin: 2rem 0;
  width: 240px;
  border-radius: 50%;
`

const NoMatch = () => {
  return (
    <Container>
      <Img src="/no_match_cat.jpg" alt="no match" />
      <h3>對不起</h3>
      <p>找不到任何店家，請試著使用更少的篩選。</p>
    </Container>
  )
}

export default NoMatch
