import { instance } from "./index"

export function createBookmark({ name }) {
  const params = { name }
  return instance.post("/bookmarks", params)
}

const Apis = {
  createBookmark,
}

export default Apis
