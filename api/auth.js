import { instance } from "./index"

export async function googleLogin({ credential }) {
  const params = { credential }
  const res = await instance.post("/auth/google", params)

  return res.data
}

export async function signup({ name, email, password }) {
  const params = { name, email, password }
  const res = await instance.post("/auth/signup", params)

  return res.data
}

export async function login({ email, password }) {
  const params = { email, password }
  const res = await instance.post("/auth/login", params)

  return res.data
}
