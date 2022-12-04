import AppBar from "features/AppBar"
import LeftContainer from "features/LeftContainer"
import MapV2 from "features/MapV2"
import LandingSearch from "features/LandingSearch"
import Head from "next/head"
import useMapControl, { WIDTH } from "stores/useMapControl"

export default function MapPage() {
  const { width } = useMapControl()
  const isLanding = width === WIDTH.fullWidth

  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <AppBar />
      <MapV2 />
      {isLanding ? <LandingSearch /> : <LeftContainer />}
    </>
  )
}
