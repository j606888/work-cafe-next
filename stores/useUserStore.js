import create from "zustand"
import { persist } from "zustand/middleware"
import jwt_decode from "jwt-decode"


const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      login: (accessToken) => {
        const user = jwt_decode(accessToken)
        set({ user, isLogin: true })
      },
      logout: () => {
        localStorage.clear()
        set({ user: null, isLogin: false })
      },
    }),
    {
      name: "user-storage",
    }
  )
)

export default useUserStore
