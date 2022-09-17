import { instance } from "./index"

const getUploadLink = async ({ placeId }) => {
  const res = await instance.get(`/stores/${placeId}/store-photos/upload-link`)
  return res.data
}

const createStorePhoto = async ({ placeId, url }) => {
  await instance.post(`/stores/${placeId}/store-photos`, { url })
}

const StorePhotoApi = {
  getUploadLink,
  createStorePhoto
}

export default StorePhotoApi
