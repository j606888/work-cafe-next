import useSWR from "swr"
import useLocationParamsStore from "./useLocationParamsStore"
import { isEmpty } from "lodash"

const useStoreSWR = () => {
  const params = useLocationParamsStore((state) => state.params)
  const queryString = new URLSearchParams(params).toString()
  const shouldFetch = !isEmpty(params)
  const path = `stores/location?${queryString}`

  const { data, isLoading } = useSWR(shouldFetch ? path : null)

  return {
    data,
    isLoading,
  }
}

export default useStoreSWR
