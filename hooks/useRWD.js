import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import { useRouter } from "next/router"
import { useEffect } from "react"

const useRWD = (redirect=false) => {
  const router = useRouter()
  const isFullScreen = useMediaQuery(devices.mobileXl)

  useEffect(() => {
    function isMobileURL() {
      return window.location.href.includes("/m")
    }

    console.log({ redirect })

    if (redirect && router.isReady) {
      if (isFullScreen && !isMobileURL()) router.push("/m")
      if (!isFullScreen && isMobileURL()) router.push("/")
    }

  }, [isFullScreen, router, redirect])

  return { isFullScreen }
}

export default useRWD
