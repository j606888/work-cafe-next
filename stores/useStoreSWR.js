import useSWR from "swr"
import useLocationParamsStore from "./useLocationParamsStore"
import { isEmpty } from "lodash"
import useStoreStore from "./useStoreStore"

const useStoreSWR = () => {
  const params = useLocationParamsStore((state) => state.params)
  const queryString = new URLSearchParams(params).toString()
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const shouldFetch = !isEmpty(params)
  const path = `stores/location?${queryString}`

  const { data, isLoading } = useSWR(shouldFetch ? path : null)

  if (data && data.stores.length === 1) {
    const placeId = data.stores[0].placeId
    setPlaceId(placeId)
  }

  return {
    data,
    isLoading,
  }
}

export default useStoreSWR
