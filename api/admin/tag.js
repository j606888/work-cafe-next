import { instance } from "../index"

export function createTag({ name }) {
  return instance.post(`/admin/tags`, { name })
}

export function updateTag({ id, name }) {
  return instance.put(`/admin/tags/${id}`, { name })
}

export function deleteTag({ id }) {
  return instance.delete(`/admin/tags/${id}`)
}

const TagApis = {
  createTag,
  updateTag,
  deleteTag,
}

export default TagApis
