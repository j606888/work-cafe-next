import Login from "features/AccountMenu/Login"
import Signup from "features/AccountMenu/Signup"

const LoginForm = ({ mode, setMode, onClose }) => {
  return (
    <>
      <Login
        open={mode === "login"}
        onClose={onClose}
        onChangeMode={() => setMode("signup")}
      />
      <Signup
        open={mode === "signup"}
        onClose={onClose}
        onChangeMode={() => setMode("login")}
      />
    </>
  )
}

export default LoginForm
