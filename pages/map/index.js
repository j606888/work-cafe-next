import LandingSearch from "features/LandingSearch"
import { LayoutUser } from "layout/user"
import Head from "next/head"
import styled from "styled-components"

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Work Cafe | Taiwan</title>
        <link rel="icon" href="/v2/face-green.svg" type="image/svg" />
        <meta name="description" content="Work Cafe - Taiwan" />
      </Head>
      <Container>
        <LandingSearch />
      </Container>
    </>
  )
}

HomePage.PageLayout = LayoutUser

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

export default HomePage
