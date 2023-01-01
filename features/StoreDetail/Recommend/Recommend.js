import React from "react"
import styled from "styled-components"
import { devices } from "constants/styled-theme"

const Recommend = ({ good = 6, bad = 1 }) => {
  return (
    <Container>
      <BlockContainer>
        <img src="/thumb-up.svg" alt="thumb-up" />
        <div>
          <Number>{good}</Number>
          <Text>人 推薦辦公</Text>
        </div>
      </BlockContainer>
      <Divider />
      <BlockContainer>
        <img src="/thumb-down.svg" alt="thumb-down" />
        <div>
          <Number>{bad}</Number>
          <Text>人 不推薦辦公</Text>
        </div>
      </BlockContainer>
    </Container>
  )
}

export default Recommend

const Container = styled.div`
  margin-left: 41px;
  margin-bottom: 40px;
  height: 76px;
  color: #222120;
  display: flex;
  gap: 2.5rem;
  margin-top: 1rem;
  background-color: #fff7ee;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  padding: 0 30px;

  @media ${devices.mobileXl} {
    margin: 16px 24px;
    gap: 1.2rem;
    padding: 0 16px;
    height: 60px;
  }
`

const Divider = styled.div`
  background-color: #ffffff;
  height: 64px;
  width: 2px;
`

const BlockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 42px;
  }

  @media ${devices.mobileXl} {
    gap: 0.6rem;
    img {
      width: 32px;
    }
  }
`
const Number = styled.span`
  font-size: 28px;
  font-weight: 500;

  @media ${devices.mobileXl} {
    font-size: 20px;
  }
`

const Text = styled.span`
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: #222120;

  @media ${devices.mobileXl} {
    font-size: 12px;
  }
`
