import { useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"

const useRWD = () => {
  const isFullScreen = useMediaQuery(devices.mobileXl)

  return { isFullScreen }
}

export default useRWD
