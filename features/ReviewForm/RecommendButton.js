import { orange20 } from "constants/color"
import { devices } from "constants/styled-theme"
import React from "react"
import styled from "styled-components"

const RecommendButton = ({ decision = true, onClick, checked=false }) => {
  const src = decision ? "/thumb-up.svg" : "/thumb-down.svg"
  const text = decision ? "推薦" : "不推薦"

  return (
    <Container onClick={onClick} checked={checked}>
      <img src={src} alt={src} />
      <span>{text}</span>
    </Container>
  )
}

const Container = styled.div`
  width: 160px;
  height: 76px;
  background-color: ${({ checked }) => (checked ? orange20 : "#f8f8f8")};
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

  @media ${devices.mobileXl} {
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