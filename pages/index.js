import AppBar from "features/AppBar"
import GoogleMap from "features/GoogleMap"
import LandingSearch from "features/LandingSearch"
import Head from "next/head"
import styled from "styled-components"
import SearchHere from "components/Button/SearchHere"
import { devices } from "constants/styled-theme"
import { useEffect } from "react"
import { useMediaQuery } from "@mui/material"
import { useRouter } from "next/router"

export default function MapPage() {
  const router = useRouter()
  const isFullScreen = useMediaQuery(devices.mobileXl)

  useEffect(() => {
    if (router.isReady && isFullScreen) {
      router.push("/m")
    }
  }, [isFullScreen, router])

  return (
    <>
      <Head>
        <title>Welcome Work Cafe</title>
      </Head>
      <Container>
        <AppBar />
        <MapArea>
          <LandingSearch />
          <GoogleMap>
            <SearchHereButton />
          </GoogleMap>
        </MapArea>
      </Container>
    </>
  )
}

const SearchHereButton = styled(SearchHere)`
  position: absolute;
  left: calc(50% + 312px);
  top: 32px;
  transform: translateX(-50%);
`

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MapArea = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`
