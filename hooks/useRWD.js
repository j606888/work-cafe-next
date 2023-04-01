import { useMediaQuery } from "@mui/material"


const useRWD = () => {
  const isFullScreen = useMediaQuery('(max-width: 720px)')

  return { isFullScreen }
}

export default useRWD
