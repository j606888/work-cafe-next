import { instance } from "./index"

const createReview = async ({ placeId, data }) => {
  const path = `/stores/${placeId}/reviews`
  await instance.post(path, data)
}

const ReviewApi = {
  createReview,
}

export default ReviewApi
