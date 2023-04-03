import LandingSearch from "features/LandingSearch"
import { LayoutUser } from "layout/user"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"

const HomePage = () => {
  const router = useRouter()

  if (!router.isReady) return null

  return (
    <Container>
      <LandingSearch />
    </Container>
  )
}

HomePage.PageLayout = LayoutUser

export default HomePage

const Container = styled.div`
  position: fixed;
  top: calc(40px + 80px);
  left: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 0;
    right: 0;
    bottom: 0;
  }
`
