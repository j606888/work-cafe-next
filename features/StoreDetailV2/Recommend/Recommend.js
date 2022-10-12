import React from "react"
import styled from "styled-components"

const Container = styled.div`
  margin-left: 104px;
  color: #757575;
  display: flex;
  gap: 2.5rem;
  margin-top: 1rem;
`

const BlockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 42px;
  }
`
const Number = styled.span`
  font-size: 32px;
  font-weight: 500;
`

const Text = styled.span`
  font-size: 14px;
`

const Recommend = ({ good = 6, bad = 1 }) => {
  return (
    <Container>
      <BlockContainer>
        <img src="/icon-good.svg" alt="good" />
        <div>
          <Number>{good}</Number>
          <span>人 推薦辦公</span>
        </div>
      </BlockContainer>
      <BlockContainer>
        <img src="/icon-bad.svg" alt="bad" />
        <div>
          <Number>{bad}</Number>
          <Text>人 不推薦辦公</Text>
        </div>
      </BlockContainer>
    </Container>
  )
}

export default Recommend
