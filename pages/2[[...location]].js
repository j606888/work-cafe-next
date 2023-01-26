import AppBar from "features/AppBar"
import LeftContainer from "features/LeftContainer"
import StoreMap from "features/StoreMap"
import LandingSearch from "features/LandingSearch"
import Head from "next/head"
import store from "stores/store"
import StoreDetail from "features/StoreDetail"
import { useEffect } from "react"
import usePanelTypeStore from "stores/usePanelTypeStore"

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
  const panelType = usePanelTypeStore((state) => state.panelType)
  const { placeId } = store((state) => ({
    placeId: state.placeId,
  }))

  useEffect(() => {
    if (placeId) window.scrollTo({ top: 0 })
  }, [placeId])

  if (panelType === 'INIT') return <LandingSearch />
  if (panelType === 'STORE_LIST') return <LeftContainer />
  if (panelType === 'STORE_DETAIL') return <StoreDetail key={placeId} />
}
