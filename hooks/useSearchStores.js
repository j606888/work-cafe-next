import store from "stores/store"
import useSWR from "swr"
import queryString from 'query-string'
import snakecaseKeys from "snakecase-keys"

const useSearchStores = () => {
  const { searchCenter, keyword } = store((state) => ({
    searchCenter: state.searchCenter,
    keyword: state.keyword,
  }))
  const storedFilters = JSON.parse(localStorage.getItem("filters")) || {}

  let params = { ...storedFilters  }

  if (typeof window !== "undefined") {
    const parsed = queryString.parse(window.location.search)
    params = { ...params, ...parsed }
  }

  if (keyword) params.keyword = keyword
  if (searchCenter.lat) {
    params.lat = searchCenter.lat
    params.lng = searchCenter.lng
  }

  params = snakecaseKeys(params, { deep: true })

  const query = new URLSearchParams(params).toString()
  const { data } = useSWR(!!params.lat ? `/stores/location?${query}` : null)
  const isLoading = !!params.lat && !data

  return { data, isLoading }
}

export default useSearchStores
