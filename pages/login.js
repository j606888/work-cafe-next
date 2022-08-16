import React from 'react'
import styled from 'styled-components'
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google"

import { useContext } from 'react'
import AuthContext from '@/context/authContext'

// TODO, use SWR to simplify

const Login = () => {
  const { login } = useContext(AuthContext)

  return (
    <GoogleOAuthProvider clientId="906529835197-kog3eacofsa1fcn6di67qs0ia9hh05i8.apps.googleusercontent.com">
      return{" "}
      <GoogleLogin
        onSuccess={login}
        onError={() => {
          console.log("Login Failed")
        }}
      />
    </GoogleOAuthProvider>
  )
}

export default Login
