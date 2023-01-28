import React from "react"
import styled from "styled-components"
import NearbySearch from "./NearbySearch"
import Searchbar from "../Searchbar"
import { devices } from "constants/styled-theme"

const LandingSearch = () => {
  return (
    <Container>
      <Content>
        <WelcomeMessage>嗨! 今天想去哪辦公呢？</WelcomeMessage>
        <p>Work Cafe 幫你快速篩選 適合辦公的咖啡店</p>
      </Content>
      <Searchbar />
      <NearbySearch />
    </Container>
  )
}

const Container = styled.div`
  z-index: 5;
  position: absolute;
  left: 28px;
  top: 28px;
  box-sizing: border-box;
  width: 628px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 37px;
  background-color: #ffffff;
  border-radius: 32px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.2);

  p {
    color: #222120;
    line-height: 19px;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }

  @media ${devices.mobileXl} {
    position: relative;
    border-radius: 0;
    padding: 52px 24px 0;
    width: 100%;
    left: auto;
    top: auto;
    box-shadow: none;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 24px;
  margin-bottom: 24px;

  @media ${devices.mobileXl} {
    text-align: center;
    padding: 0;
  }
`

const WelcomeMessage = styled.h3`
  margin: 0;
  color: #222120;
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
`

export default LandingSearch
