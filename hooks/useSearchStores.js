import useSWR from "swr"
import { useRouter } from "next/router"

const useSearchStores = () => {
  const router = useRouter()
  const queryString = new URLSearchParams(router.query).toString()

  const { data } = useSWR(
    !!queryString ? `/stores/location?${queryString}` : null
  )
  const isLoading = !!queryString && !data

  return { data, isLoading }
}

export default useSearchStores
