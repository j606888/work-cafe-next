import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import { useRouter } from "next/router"
import { useEffect } from "react"


export default function IndexPage() {
  const router = useRouter()
  const isFullScreen = useMediaQuery(devices.mobileXl)

  useEffect(() => {
    if (router.isReady) {
      isFullScreen ? router.push("/m/map") : router.push("/map")
    }
  }, [router, isFullScreen])

  return (
    <div>
      <p>等待轉址中...</p>
    </div>
  )
}
