import axios from "axios"
import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

// TODO, move crawl other file
// TODO, 401 not-login vs 401 not-admin

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken")
  const { data } = await instance.post("/auth/refresh", {
    refresh_token: refreshToken,
  })

  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
}

export const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use((config) => {
  if (config.params) {
    config.params = snakecaseKeys(config.params, { deep: true })
  }

  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }

  return config
})

instance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true })
    }

    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      await refreshAccessToken()
      return instance(originalRequest)
    }

    return Promise.reject(error)
  }
)

export async function createCrawlRecord(crawlRecord) {
  await instance.post("/admin/map-crawlers", crawlRecord)
}

export async function getCrawlRecords({ lat, lng }) {
  const params = { lat, lng }
  const res = await instance.get("/admin/map-crawlers", { params })
  return res.data
}

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

export default {
  instance,
  createCrawlRecord,
  getCrawlRecords,
  getStores,
  getStoresByLocation,
  getStore,
}
