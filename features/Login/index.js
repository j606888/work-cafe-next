import React, { useState } from "react"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import { Button, IconButton, Paper, TextField, Divider } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import * as Yup from "yup"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { googleLogin, login } from "api/auth"
import { Container } from "./styled"

const GOOGLE_LOGIN_KEY = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_KEY

const FormikTextField = ({ label, formik, type = "text" }) => {
  const showError = !!(formik.touched[label] && formik.errors[label])
  const [showPassword, setShowPassword] = useState(false)
  const passwordProp =
    type === "password"
      ? {
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((cur) => !cur)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }
      : {}
  const fieldType = type === "text" || showPassword ? "text" : "password"

  return (
    <TextField
      type={fieldType}
      placeholder={`Enter ${label}`}
      id={label}
      label={label}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[label]}
      error={showError}
      helperText={showError && formik.errors[label]}
      InputProps={passwordProp}
    />
  )
}

const Login = () => {
  const router = useRouter()

  async function handleLogin(tokenResponse) {
    const to = router.query.to
    const { accessToken, refreshToken } = await googleLogin({ credential: tokenResponse.credential })
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)

    to ? router.push(to) : router.push('/')
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must has at least 8 words")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const { accessToken, refreshToken } = await login(values)
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      router.push("/")
    },
  })

  return (
    <GoogleOAuthProvider clientId={GOOGLE_LOGIN_KEY}>
      <Container>
        <Paper elevation={3}>
          <form onSubmit={formik.handleSubmit}>
            <div className="headline">
              <h2>註冊</h2>
              <p>繼續使用 Work Cafe</p>
            </div>
            <div className="account">
              <FormikTextField label="email" formik={formik} />
              <FormikTextField
                label="password"
                formik={formik}
                type="password"
              />
              <Button variant="contained" type="submit" size="large">
                登入
              </Button>
            </div>
            <Divider light>或者使用以下登入</Divider>
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => {
                console.log("Login Failed")
              }}
              type="icon"
            />
            <p className="no-account">
              沒有帳號嗎？<Link href="/signup">註冊</Link>
            </p>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  )
}

export default Login
