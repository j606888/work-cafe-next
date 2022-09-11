const { useRouter } = require("next/router")
const { userIsLogin } = require("utils/user")

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
