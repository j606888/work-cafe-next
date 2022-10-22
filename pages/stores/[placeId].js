import React from "react"
import { useRouter } from "next/router"
import useSWR from "swr"

const PlaceRedirect = () => {
  const router = useRouter()
  const { placeId } = router.query
  const { data, error } = useSWR(placeId ? `/stores/${placeId}` : null)

  if (!placeId) return <h2>No placeId found</h2>
  if (error) return <h2>Place Not Found</h2>
  if (data) {
    const { lat, lng } =data
    const newPath = `/@${lat},${lng},15z/${placeId}`
    router.push(newPath)
  }

  return <div>loading...</div>
}

export default PlaceRedirect
