import AppBar from "features/AppBar"
import LeftContainer from "features/LeftContainer"
import StoreMap from "features/StoreMap"
import LandingSearch from "features/LandingSearch"
import Head from "next/head"
import useMapControl, { WIDTH } from "stores/useMapControl"
import useStoreStore from "stores/useStoreStore"
import StoreDetail from "features/StoreDetail"
import { useEffect } from "react"

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <AppBar />
      <StoreMap />
      <DisplayComponent />
    </>
  )
}

const DisplayComponent = () => {
  const placeId = useStoreStore((state) => state.placeId)
  const { width } = useMapControl()
  const isLanding = width === WIDTH.fullWidth

  useEffect(() => {
    if (placeId) window.scrollTo({ top: 0 })
  }, [placeId])

  if (placeId) return <StoreDetail key={placeId} />
  if (isLanding) return <LandingSearch />
  return <LeftContainer />
}
