import { instance } from "./index"
import { snakeCase } from "lodash"

export async function getStores({ page, per, cities, rating, order, orderBy }) {
  const params = { page, per, order, orderBy }
  if (cities) {
    params.cities = cities
  }
  if (rating) {
    params.rating = rating
  }
  const res = await instance.get("/admin/stores", { params })

  return res.data
}

export async function getStoresByLocation({ lat, lng }) {
  const params = { lat, lng, limit: 30 }
  const res = await instance.get("/admin/stores/location", { params })

  return res.data
}

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

const getPublicStore = ({ placeId }) => {
  return instance.get(`/stores/${placeId}`)
}

const Apis = {
  getPublicStore,
  hideStore,
  unhideStore,
}

export default Apis
