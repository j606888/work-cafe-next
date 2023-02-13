import { instance } from "../index"

export function syncPhoto({ placeId }) {
  return instance.post(`/admin/stores/${placeId}/sync-photos`)
}

const Apis = {
  syncPhoto,
}

export default Apis
