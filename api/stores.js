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

export async function hideUnqualifiedStores() {
  await instance.post(`/admin/stores/hide-all-unqualified`)
}

export async function syncStorePhotos(placeId) {
  await instance.post(`/admin/stores/${placeId}/sync-photos`)
}

const getHint = ({ keyword, openType, openWeek, openHour }) => {
  const params = {
    keyword,
    open_type: openType && snakeCase(openType),
    open_week: openWeek,
    open_hour: openHour,
  }
  return instance.get(`/stores/hint`, { params })
}

const getPublicStoresByLocation = ({
  keyword,
  lat,
  lng,
  limit = 20,
  openType,
  openWeek,
  openHour,
}) => {
  const params = {
    keyword,
    lat,
    lng,
    limit,
    open_type: openType && snakeCase(openType),
    open_week: openWeek,
    open_hour: openHour,
  }
  return instance.get("/stores/location", { params })
}

const Apis = {
  getHint,
  getPublicStoresByLocation,
}

export default Apis