import Login from "features/_AccountMenu/Login"
import Signup from "features/_AccountMenu/Signup"

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
