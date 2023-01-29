import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import { useRouter } from "next/router"
import { useEffect } from "react"

const useRWD = (options={}) => {
  const router = useRouter()
  const isFullScreen = useMediaQuery(devices.mobileXl)

  useEffect(() => {
    function isMobileURL() {
      return window.location.href.includes("/m/map")
    }

    if (options.redirect && router.isReady) {
      if (isFullScreen && !isMobileURL()) router.push("/m/map")
      if (!isFullScreen && isMobileURL()) router.push("/map")
    }
  }, [isFullScreen, router, options])

  return { isFullScreen }
}

export default useRWD
