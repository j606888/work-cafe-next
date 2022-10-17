import { useRouter } from "next/router"
import useUserStore from "stores/useUserStore"

const useAuthCheck = () => {
  const route = useRouter()
  const isLogin = useUserStore(state => state.isLogin)

  const authCheck = () => {
    if (!isLogin) {
      route.push('/login')
    }
  }

  return authCheck
}

export default useAuthCheck
