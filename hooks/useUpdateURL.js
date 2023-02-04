import { useRouter } from 'next/router'
import store from 'stores/store'
import { mapCenter } from 'utils/map-helper'

const useUpdateURL = () => {
  const router = useRouter()
  const { map } = store((state) => ({ map: state.map }))

  function setCenterToURL() {
    const { lat, lng, zoom } = mapCenter(map)
    let path = `/new-map/@${lat},${lng},${zoom}z`
    router.push(path)
  }
  function setCenterWithPlaceIdToURL(placeId) {
    const { lat, lng, zoom } = mapCenter(map)
    let path = `/new-map/place/${placeId}/@${lat},${lng},${zoom}z`
    router.push(path)
  }

  return { setCenterToURL, setCenterWithPlaceIdToURL }
}

export default useUpdateURL
