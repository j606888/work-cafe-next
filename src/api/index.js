import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

export async function createCrawlRecord(crawlRecord) {
  await instance.post("/admin/map-crawlers", crawlRecord)
}

export async function getCrawlRecords({lat, lng}) {
  const params = { lat, lng }
  const res = await instance.get("/admin/map-crawlers", { params })
  return res.data
}

export async function getStores({page, per, cities, rating, order, orderBy}) {
  const params = { page, per, order, order_by: orderBy }
  if (cities) {
    params.cities = cities
  }
  if (rating) {
    params.rating = rating
  }
  const res = await instance.get("/admin/stores", { params })

  return res.data
}

export async function getStore(placeId) {
  const res = await instance.get(`/admin/stores/${placeId}`)

  return res.data
}

export default {
  createCrawlRecord,
  getCrawlRecords,
  getStores,
  getStore,
}
