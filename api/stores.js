import { instance } from "./index"

export function getStoreByPlaceId(placeId) {
  return instance.get(`/stores/${placeId}`)
}

export async function storeGoogleSearch({ keyword, location }) {
  const res = await instance.post("/stores/google-search", {
    keyword,
    location,
  })
  return res.data
}

export async function createStore({ placeId }) {
  await instance.post("/stores", { placeId })
}

const Apis = {
  getStoreByPlaceId,
  storeGoogleSearch,
  createStore,
}

export default Apis
