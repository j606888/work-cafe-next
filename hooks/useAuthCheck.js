import { useRouter } from "next/router"
import { userIsLogin } from "utils/user"

const useAuthCheck = () => {
  const route = useRouter()

  const authCheck = () => {
    if (!userIsLogin()) {
      route.push('/login')
    }
  }

  return authCheck
}

export default useAuthCheck
