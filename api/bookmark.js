import { instance } from "./index"

export function createBookmark({ name }) {
  const params = { name }
  return instance.post("/bookmarks", params)
}

export function deleteBookmark({ randomKey }) {
  return instance.delete(`/bookmarks/${randomKey}`)
}

const Apis = {
  createBookmark,
  deleteBookmark,
}

export default Apis
