import React from 'react'
import styled from 'styled-components'
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google"

import { googleLogin } from '@/api/auth'
import { useRouter } from 'next/router'

// TODO, use SWR to simplify
const Container = styled.div`
`

const Login = () => {
  const router = useRouter()

  async function handleLogin(tokenResponse) {
    const res = await googleLogin({ credential: tokenResponse.credential })
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)

    router.push("/admin/stores")
  }

  return (
    <Container>
      <GoogleOAuthProvider clientId="906529835197-kog3eacofsa1fcn6di67qs0ia9hh05i8.apps.googleusercontent.com">
        return{" "}
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log("Login Failed")
          }}
        />
      </GoogleOAuthProvider>
    </Container>
  )
}

export default Login
