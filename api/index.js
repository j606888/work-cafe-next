import axios from "axios"
import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

const API_HOST = process.env.NEXT_PUBLIC_API_HOST
const STORYBOOK = process.env.STORYBOOK_MODE

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken")
  const { data } = await instance.post("/auth/refresh", {
    refresh_token: refreshToken,
  })

  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
}

const baseURL = !!STORYBOOK ? null : API_HOST
export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use((config) => {
  if (config.params) {
    config.params = snakecaseKeys(config.params, { deep: true })
  }

  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true })
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

export const fetcher = (url, params) => {
  return instance.get(url, { params }).then((res) => res.data)
}

const api = {
  instance,
  fetcher,
}

export default api
