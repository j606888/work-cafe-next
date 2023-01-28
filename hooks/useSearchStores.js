import store from "stores/store"
import useSWR from "swr"

const useSearchStores = () => {
  const { searchCenter, keyword } = store((state) => ({
    searchCenter: state.searchCenter,
    keyword: state.keyword,
  }))
  const params = {}

  if (keyword) {
    params.keyword = keyword
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
