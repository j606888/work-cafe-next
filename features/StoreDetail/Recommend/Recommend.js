import React from "react"
import styled from "styled-components"
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
        <img src="/v2/thumb-up-green.svg" alt="thumb-up" width={52} />
        <div>
          <Number>{good}</Number>
          <Text>人 推薦辦公</Text>
        </div>
      </BlockContainer>
      <Divider />
      <BlockContainer onClick={() => handleClick("no")}>
        <img src="/v2/thumb-down-black.svg" alt="thumb-down" />
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
  background-color: ${({ theme }) => theme.colors.green03};
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
  background-color: ${({ theme }) => theme.colors.white};
  height: 64px;
  width: 2px;
`

const BlockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .4rem;

  img {
    width: 52px;
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
  color: ${({ theme }) => theme.colors.black01};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`
