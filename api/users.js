import { instance } from "./index"

export async function getUsers({ page, per, order, orderBy }) {
  const params = { page, per, order, orderBy }
  const res = await instance.get("/admin/users", { params })

  return res.data
}
