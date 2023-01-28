import store from "stores/store"
import useSWR from "swr"

const useSearchStores = () => {
  const { searchCenter } = store((state) => ({
    searchCenter: state.searchCenter
  }))
  const params = {}

  if (
    typeof window !== "undefined" &&
    window.location.href.includes("keyword")
  ) {
    const keyword = window.location.search.replace("?keyword=", "")
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
