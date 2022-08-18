import React from 'react'
import styled from 'styled-components'
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google"

import { useContext } from 'react'
import AuthContext from '@/context/authContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// TODO, use SWR to simplify

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const Login = () => {
  const router = useRouter()
  const { login } = useContext(AuthContext)

  function handleLogin(tokenResponse) {
    const to = router.query.to
    login(tokenResponse, to)
  }

  return (
    <Container>
      <GoogleOAuthProvider clientId="906529835197-kog3eacofsa1fcn6di67qs0ia9hh05i8.apps.googleusercontent.com">
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
