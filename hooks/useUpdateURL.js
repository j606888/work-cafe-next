import { useRouter } from 'next/router'
import store from 'stores/store'
import { mapCenter } from 'utils/map-helper'
import useRWD from './useRWD'

const useUpdateURL = () => {
  const { isFullScreen } = useRWD()
  const router = useRouter()
  const { map } = store((state) => ({ map: state.map }))

  function setCenterToURL() {
    const { lat, lng, zoom } = mapCenter(map)
    let path = `/new-map/@${lat},${lng},${zoom}z`
    // if (isFullScreen) path = "/m" + path
    router.push(path)
  }
  function setCenterWithPlaceIdToURL(placeId) {
    const { lat, lng, zoom } = mapCenter(map)
    let path = `/map/place/${placeId}/@${lat},${lng},${zoom}z`
    if (isFullScreen) path = "/m" + path
    router.push(path)
  }

  return { setCenterToURL, setCenterWithPlaceIdToURL }
}

export default useUpdateURL
