import { instance } from "./index"

const create = (content) => {
  return instance.post('/new-store-requests', { content })
}

const NewStoreRequestApi = {
  create
}

export default NewStoreRequestApi
