import React from "react"
import styled from "styled-components"

const RecommendButton = ({ decision = true, onClick, checked=false }) => {
  const color = checked ? "green": "black"
  const src = decision
    ? `/v2/thumb-up-${color}.svg`
    : `/v2/thumb-down-${color}.svg`
  const text = decision ? "推薦" : "不推薦"

  return (
    <Container onClick={onClick} checked={checked}>
      <img src={src} alt={src} width={52} />
      <span>{text}</span>
    </Container>
  )
}

const Container = styled.div`
  width: 160px;
  height: 76px;
  background-color: ${({ theme, checked }) => (checked ? theme.colors.green03 : "#f8f8f8")};
  border-radius: 20px;
  display: flex;
  padding-left: 21px;
  align-items: center;
  cursor: pointer;

  span {
    font-weight: 700;
    font-size: 20px;
    color: #222120;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 132px;
    height: 60px;
    padding-left: 18px;

    img {
      height: 44px;
      width: 44px;
    }

    span {
      font-size: 16px;
    }

  }
`

export default RecommendButton
