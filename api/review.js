import { instance } from "./index"

const createReview = async ({ placeId, data }) => {
  const path = `/stores/${placeId}/reviews`
  const res = await instance.post(path, data)
  return res.data
}

const deleteMyReview = async ({ placeId }) => {
  const path = `/stores/${placeId}/reviews`
  await instance.delete(path)
}

const ReviewApi = {
  createReview,
  deleteMyReview
}

export default ReviewApi
