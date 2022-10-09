import jwt_decode from "jwt-decode"

export function userIsLogin() {
  if (typeof window === 'undefined') return false

  return !!localStorage.getItem("accessToken")
}

export function userIsAdmin() {
  const user = getUser()
  return user && user.role === "admin"
}

export function getUser() {
  const accessToken = localStorage.getItem("accessToken")
  if (!accessToken) return null

  return jwt_decode(accessToken)
}
