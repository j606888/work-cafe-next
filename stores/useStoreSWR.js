import useSWR from "swr"
import useLocationParamsStore from "./useLocationParamsStore"
import { isEmpty } from "lodash"
import useStoreStore from "./useStoreStore"
import { useEffect } from "react"

const useStoreSWR = () => {
  const params = useLocationParamsStore((state) => state.params)
  const clear = useLocationParamsStore((state) => state.clear)
  const queryString = new URLSearchParams(params).toString()
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const shouldFetch = !isEmpty(params)
  const path = `stores/location?${queryString}`

  const { data, isLoading } = useSWR(shouldFetch ? path : null)

  useEffect(() => {
    if (data && data.stores.length === 1) {
      const placeId = data.stores[0].placeId
      setPlaceId(placeId)
      clear()
    }
  }, [data, setPlaceId, clear])

  return {
    data,
    isLoading,
  }
}

export default useStoreSWR
