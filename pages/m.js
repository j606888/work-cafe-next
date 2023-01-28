import AppBar from "features/AppBar"
import LandingSearch from "features/LandingSearch"
import useRWD from "hooks/useRWD"
import Head from "next/head"
import styled from "styled-components"

export default function MobileWelcomePage() {
  useRWD({ redirect: true })
  return (
    <>
      <Head>
        <title>Welcome Work Cafe</title>
      </Head>
      <FullScreenOverlay>
        <AppBar />
        <LandingSearch />
      </FullScreenOverlay>
    </>
  )
}

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
