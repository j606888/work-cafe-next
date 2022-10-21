import useSWR from "swr"
import useLocationParamsStore from "./useLocationParamsStore"

const useStoreSWR = () => {
  const params = useLocationParamsStore((state) => state.params)
  const isStarted = !!params.lat
  const { data, mutate } = useSWR(
    isStarted ? ["stores/location", { ...params }] : null
  )

  return {
    data,
    isStarted,
    mutate,
    isLoading: isStarted && !data,
  }
}

export default useStoreSWR
