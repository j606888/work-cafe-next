import useUserStore from "stores/useUserStore"
import useSWR from "swr"

const useRefreshStore = ({ placeId }) => {
  const user = useUserStore((state) => state.user)
  const { mutate: mutateStore } = useSWR(`/stores/${placeId}`)
  const { mutate: mutateStoreReviews } = useSWR(`/stores/${placeId}/reviews`)
  const { mutate: mutateMyReview } = useSWR(
    user ? `/stores/${placeId}/reviews/me` : null
  )

  async function refreshStore() {
    await mutateStore()
    await mutateStoreReviews()
    await mutateMyReview()
  }

  return refreshStore
}

export default useRefreshStore
