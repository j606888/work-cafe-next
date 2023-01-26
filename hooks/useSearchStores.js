import useSWR from "swr"

const useSearchStores = () => {
  const path = window.location.pathname
  const match = path.match(/@([\d.-]+),([\d.-]+),([\d]+)z/)
  const params = {}

  if (path.includes('/search/')) {
    const m = path.match(/search\/(.*)\/@/)
    params.keyword = m[1]
  }

  if (match) {
    params.lat = +match[1]
    params.lng = +match[2]
  }

  const queryString = new URLSearchParams(params).toString()
  const { data } = useSWR(!!params.lat ? `/stores/location?${queryString}` : null)
  const isLoading = !!params.lat && !data

  return { data, isLoading }
}

export default useSearchStores
