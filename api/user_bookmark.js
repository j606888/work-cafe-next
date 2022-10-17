import { instance } from "./index"

export function addToBookmark({ placeId }) {
  return instance.post(`/stores/${placeId}/user-bookmarks`)
}

export function removeFromBookmark({ placeId }) {
  return instance.delete(`/stores/${placeId}/user-bookmarks`)
}

const Apis = {
  addToBookmark,
  removeFromBookmark,
}

export default Apis
