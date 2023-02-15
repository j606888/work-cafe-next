import { instance } from "./index"

export function getStoreByPlaceId(placeId) {
  return instance.get(`/stores/${placeId}`)
}

const Apis = {
  getStoreByPlaceId,
}

export default Apis
