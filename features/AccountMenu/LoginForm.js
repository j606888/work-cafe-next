import Login from "features/Login"
import Signup from "features/Signup"
import React, { useState } from "react"

const LoginForm = ({ open, onClose }) => {
  const [mode, setMode] = useState("login")

  return mode === "login" ? (
    <Login open={open} onClose={onClose} onChangeMode={() => setMode('signup') }/>
  ) : (
    <Signup open={open} onClose={onClose} onChangeMode={() => setMode('login')} />
  )
}

export default LoginForm
