import { instance } from "./index"

export function createBookmark({ name }) {
  const params = { name }
  return instance.post("/bookmarks", params)
}

export function deleteBookmark({ randomKey }) {
  return instance.delete(`/bookmarks/${randomKey}`)
}

export function saveBookmarkStore({ placeId, randomKey }) {
  return instance.post(`/stores/${placeId}/bookmarks/${randomKey}`)
}

export function unSaveBookmarkStore({ placeId, randomKey }) {
  return instance.delete(`/stores/${placeId}/bookmarks/${randomKey}`)
}

const Apis = {
  createBookmark,
  deleteBookmark,
  saveBookmarkStore,
  unSaveBookmarkStore,
}

export default Apis
