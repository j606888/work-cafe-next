import create from "zustand"
import { persist } from "zustand/middleware"
import jwt_decode from "jwt-decode"
import mixpanel from "mixpanel-browser"

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      login: (accessToken) => {
        const user = jwt_decode(accessToken)
        set({ user, isLogin: true })
        mixpanel.identify(user.user_id)
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
