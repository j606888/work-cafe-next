import axios from "axios"
// import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

const API_HOST = process.env.NEXT_PUBLIC_API_HOST

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken")
  const { data } = await instance.post("/auth/refresh", {
    refresh_token: refreshToken,
  })

  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
}

export const instance = axios.create({
  baseURL: API_HOST,
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

// instance.interceptors.response.use(
//   (response) => {
//     if (response.data) {
//       response.data = camelcaseKeys(response.data, { deep: true })
//     }

//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true

//       await refreshAccessToken()
//       return instance(originalRequest)
//     }

//     return Promise.reject(error)
//   }
// )

export default {
  instance,
}
