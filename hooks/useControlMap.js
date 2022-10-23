import useMapStoreV2 from "stores/useMapStoreV2"
import shallow from "zustand/shallow"
import Router from "next/router"
import useStoreStore from "stores/useStoreStore"

const useControlMap = ({ navigate=true }) => {
  const [map, setMap, center, setCenter] = useMapStoreV2(
    (state) => [state.map, state.setMap, state.center, state.setCenter],
    shallow
  )
  const placeId = useStoreStore(state => state.placeId)

  function handleLoad(loadedMap) {
    setMap(loadedMap)
  }

  function handleIdle() {
    if (!map) return

    const zoom = map.zoom
    const { lat, lng } = map.center.toJSON()
    setCenter({ lat, lng })

    const mapPath = _mapPath(lat, lng, zoom, placeId)
    if (navigate) {
      _navigateTo(`/${mapPath}`)
    }
    _setLocalStorage("lastLocation", mapPath)
  }

  function updateWithPlaceId(placeId, navigate=true) {
    if (!map) return

    const zoom = map.zoom
    const { lat, lng } = map.center.toJSON()
    setCenter({ lat, lng })

    const mapPath = _mapPath(lat, lng, zoom, placeId)
    if (navigate) {
      _navigateTo(`/${mapPath}`)
      _setLocalStorage("lastLocation", mapPath)
    }
  }

  function moveTo({ latLng, zoom = 15}) {
    if (!map) return

    map.setZoom(zoom)
    map.panTo(latLng)
  }


  return  { handleLoad, handleIdle, moveTo, center, updateWithPlaceId }
}

function _mapPath(lat, lng, zoom, placeId) {
  return [`@${lat.toFixed(5)},${lng.toFixed(5)},${zoom}z`, placeId]
    .filter(Boolean)
    .join("/")
}

function _navigateTo(path) {
  Router.push(path)
}

function _setLocalStorage(key, value) {
  localStorage.setItem(key, value)
}

export default useControlMap
