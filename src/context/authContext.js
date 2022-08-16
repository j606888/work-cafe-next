import { useEffect } from 'react'
import { createContext, useState } from 'react'
import { googleLogin } from '@/api/auth'
import { useRouter } from 'next/router'
import jwt_decode from "jwt-decode"

export const AuthContext = createContext({
  user: "",
  isLoading: true,
  login: () => {},
  logout: () => {}
})

// TODO, use Auth Component to prevent flash render
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  function tryLogin() {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) setUser(jwt_decode(accessToken))

    setIsLoading(false)
  }

  useEffect(() => {
    tryLogin()
  }, [])

  async function login(tokenResponse) {
    setIsLoading(true)
    
    const res = await googleLogin({ credential: tokenResponse.credential })
    localStorage.setItem("accessToken", res.accessToken)
    localStorage.setItem("refreshToken", res.refreshToken)
    tryLogin()

    router.push("/admin/stores")
  }

  function logout() {
    console.log("Say bye bye")
    localStorage.clear()
    setUser(null)
  }

  let contextData = {
    user,
    login,
    logout,
    isLoading
  }

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export default AuthContext
