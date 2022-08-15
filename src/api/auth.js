import { instance } from "./index"

export async function googleLogin({ credential }) {
  const params = { credential }
  const res = await instance.post("/auth/google", params)

  return res.data
}

export default {
  googleLogin,
}
