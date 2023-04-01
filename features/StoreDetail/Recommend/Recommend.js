import React from "react"
import styled from "styled-components"

import { grey01, grey06, orange20 } from "constants/color"
import formControlStore from "stores/formControlStore"

const Recommend = ({ good = 0, bad = 0 }) => {
  const { setNewReviewOpen, setDefaultDecision } = formControlStore(
    (state) => ({
      setNewReviewOpen: state.setNewReviewOpen,
      setDefaultDecision: state.setDefaultDecision,
    })
  )

  function handleClick(defaultDecision) {
    setDefaultDecision(defaultDecision)
    setNewReviewOpen(true)
  }

  return (
    <Container>
      <BlockContainer onClick={() => handleClick("yes")}>
        <img src="/thumb-up.svg" alt="thumb-up" />
        <div>
          <Number>{good}</Number>
          <Text>人 推薦辦公</Text>
        </div>
      </BlockContainer>
      <Divider />
      <BlockContainer onClick={() => handleClick("no")}>
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
  background-color: ${orange20};
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  padding: 0 30px;
  cursor: pointer;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 16px 24px;
    gap: 1.2rem;
    padding: 0 16px;
    height: 60px;
  }
`

const Divider = styled.div`
  background-color: ${grey06};
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.6rem;
    img {
      width: 32px;
    }
  }
`
const Number = styled.span`
  font-size: 28px;
  font-weight: 500;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`

const Text = styled.span`
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: ${grey01};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`
