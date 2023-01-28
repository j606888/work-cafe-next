import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import { useRouter } from "next/router"
import { useEffect } from "react"

const useRWD = () => {
  const router = useRouter()
  const isFullScreen = useMediaQuery(devices.mobileXl)

  useEffect(() => {
    function isMobileURL() {
      return window.location.href.includes("/m")
    }

    if (router.isReady && isFullScreen && !isMobileURL()) {
      router.push("/m")
    }

    if (router.isReady && !isFullScreen && isMobileURL()) {
      router.push("/")
    }

  }, [isFullScreen, router])

  return { isFullScreen }
}

export default useRWD
