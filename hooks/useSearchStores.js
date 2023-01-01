import create from "zustand"
import useSWR from "swr"

const useParamsStore = create((set) => ({
  params: {},
  setParams: (params) => set({ params }),
}))

const useSearchStores = () => {
  const params = useParamsStore((state) => state.params)
  const setParams = useParamsStore((state) => state.setParams)
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
  const { data } = useSWR(
    !!queryString ? `/stores/location?${queryString}` : null
  )
  const isLoading = !!queryString && !data

  return { data, search: setParams, isLoading }
}

export default useSearchStores
