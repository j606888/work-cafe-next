import store from "stores/store"
import useSWR from "swr"

const useSearchStores = () => {
  const { searchCenter } = store((state) => ({
    searchCenter: state.searchCenter,
  }))
  const path = window.location.pathname
  const params = {}

  if (path.includes('/search/')) {
    const m = path.match(/search\/(.*)\/@/)
    params.keyword = m[1]
  }

  if (searchCenter.lat) {
    params.lat = searchCenter.lat
    params.lng = searchCenter.lng
  }

  const queryString = new URLSearchParams(params).toString()
  const { data } = useSWR(!!params.lat ? `/stores/location?${queryString}` : null)
  const isLoading = !!params.lat && !data

  return { data, isLoading }
}

export default useSearchStores
