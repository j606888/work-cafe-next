import useSWR from "swr"

const useSearchStores = () => {
  const path = window.location.pathname
  const match = path.match(/@([\d.-]+),([\d.-]+),([\d]+)z/)
  let lat
  let lng

  if (match) {
    lat = +match[1]
    lng = +match[2]
  }

  const { data } = useSWR(
    !!lat ? `/stores/location?lat=${lat}&lng=${lng}` : null
  )
  const isLoading = !!lat && !data

  return { data, isLoading }
}

export default useSearchStores
