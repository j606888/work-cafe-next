import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import Head from "next/head"
import styled from "styled-components"

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <Container>
        <AppBar />
        <GoogleMap />
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`
