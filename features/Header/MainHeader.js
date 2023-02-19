import { grey01, grey02, grey04 } from "constants/color"
import { devices } from "constants/styled-theme"
import AccountMenu from "features/AccountMenu"
import React from "react"
import useUserStore from "stores/useUserStore"
import styled from "styled-components"

export const LINKS = [
  {
    href: "https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/",
    text: "什麼是Work Cafe？",
  }
]

const MainHeader = () => {
  const user = useUserStore((state) => state.user)

  return (
    <Container>
      <HomeLink href="/map">Work Cafe | Taiwan</HomeLink>
      {!user && LINKS.map(({ href, text }, index) => (
        <Link href={href} key={index} target="_blank" rel="noreferrer">
          {text}
        </Link>
      ))}
      <AccountMenu />
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

export const Link = styled.a`
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

export default MainHeader
