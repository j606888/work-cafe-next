import { instance } from "./index"

export async function hideUnqualifiedStores() {
  await instance.post(`/admin/stores/hide-all-unqualified`)
}
