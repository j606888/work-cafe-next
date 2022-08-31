import { useState } from "react"

const useApi = (apiFunc) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const request = async (...args) => {
    setLoading(true)

    try {
      const result = await apiFunc(...args)
      setData(result.data)
    } catch (err) {
      setError(err.message || "Unexpected Error!")
    } finally {
      setLoading(false)
    }
  }

  const clean = () => {
    setData(null)
  }

  return {
    data,
    error,
    loading,
    request,
    clean,
  }
}

export default useApi
