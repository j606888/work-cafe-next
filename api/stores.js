import { instance } from "./index"

export async function getStore(placeId) {
  const res = await instance.get(`/admin/stores/${placeId}`)

  return res.data
}

const hideStore = ({placeId}) => {
  return instance.post(`/stores/${placeId}/hide`)
}

const unhideStore = ({placeId}) => {
  return instance.post(`/stores/${placeId}/unhide`)
}

export async function hideUnqualifiedStores() {
  await instance.post(`/admin/stores/hide-all-unqualified`)
}

export async function syncStorePhotos(placeId) {
  await instance.post(`/admin/stores/${placeId}/sync-photos`)
}

const StoreApi = {
  hideStore,
  unhideStore,
}

export default StoreApi
