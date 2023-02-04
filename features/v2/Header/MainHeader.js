import { grey01, grey02, grey04 } from "constants/color"
import { devices } from "constants/styled-theme"
import React from "react"
import styled from "styled-components"

const LINKS = [
  {
    href: "https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/",
    text: "什麼是Work Cafe？",
  },
  {
    href: "https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/shi-yong-jiao-xue/di-yi-ci-shi-yong",
    text: "使用教學",
  },
]

const MainHeader = () => {
  return (
    <Container>
      <HomeLink href="/new-map">Work Cafe | Taiwan</HomeLink>
      {LINKS.map(({ href, text }, index) => (
        <Link href={href} key={index} target="_blank" rel="noreferrer">
          {text}
        </Link>
      ))}
      <UserInfo isLoggedIn={null}>J</UserInfo>
    </Container>
  )
}

const Container = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 60px;
  border-bottom: 1px solid ${grey04};

  @media ${devices.mobileXl} {
    height: 56px;
    padding: 0 24px;
  }
`

const HomeLink = styled.a`
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${grey01};
  margin-right: 48px;

  @media ${devices.mobileXl} {
    font-size: 16px;
    line-height: 22px;
  }
`

const Link = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${grey02};
  margin-right: 32px;
  text-decoration: none;

  @media ${devices.mobileXl} {
    display: none;
  }
`

const UserInfo = styled.div`
  margin-left: auto;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${devices.mobileXl} {
    width: 36px;
    height: 36px;
  }
`

export default MainHeader
