import { instance } from "./index"

export async function getBlacklists() {
  const res = await instance.get("/admin/blacklists")

  return res.data
}

export async function createBlacklist({ keyword }) {
  const params = { keyword }
  await instance.post("/admin/blacklists", params)
}

export async function deleteBlacklist({ id }) {
  await instance.delete(`/admin/blacklists/${id}`)
}

export default {
  getBlacklists,
  createBlacklist,
  deleteBlacklist,
}
