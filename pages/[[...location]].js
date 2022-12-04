import AppBar from "features/AppBar";
import LeftContainer from "features/LeftContainer";
import MapV2 from "features/MapV2";
import LandingSearch from "features/LandingSearch";
import Head from "next/head";

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <AppBar />
      <LandingSearch />
      <LeftContainer />
      <MapV2 />
    </>
  )
}
