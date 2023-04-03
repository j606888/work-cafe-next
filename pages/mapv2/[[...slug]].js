import GoogleMap from "features/GoogleMap"
import HomePage from "features/PagesWithMap/HomePage"
import StoreDetailPage from "features/PagesWithMap/StoreDetailPage"
import StoreListPage from "features/PagesWithMap/StoreListPage"
import { LayoutUser } from "layout/user"
import { useRouter } from "next/router"
import styled from "styled-components"

export default function MapV2() {
  const router = useRouter()
  const { slug } = router.query

  if (!router.isReady) return null

  let content = null
  if (slug === undefined) {
    content = <HomePage />
  } else if (slug[0] === "place") {
    content = <StoreDetailPage />
  } else {
    content = <StoreListPage />
  }

  return <>
    {content}
    
  </>
}

MapV2.PageLayout = LayoutUser

