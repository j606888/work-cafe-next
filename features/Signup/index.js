import React, { useState } from "react"
import { Button, IconButton, Paper, TextField } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import * as Yup from "yup"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { signup } from "api/auth"
import { Container, Form } from "./styled"

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
  const fieldType = (type === 'text' || showPassword) ? 'text' : 'password'

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

const Signup = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must has at least 8 words")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const { accessToken, refreshToken } = await signup(values)
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      router.push("/")
    },
  })

  return (
    <Container>
      <Paper elevation={3}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="headline">
            <h2>註冊</h2>
            <p>繼續使用 Work Cafe</p>
          </div>
          <div className="account">
            <FormikTextField label="name" formik={formik} />
            <FormikTextField label="email" formik={formik} />
            <FormikTextField label="password" formik={formik} type="password" />
            <Button variant="contained" type="submit" size="large">
              註冊
            </Button>
          </div>
          <p className="no-account">
            已經有帳號了嗎？<Link href="/login">登入</Link>
          </p>
        </Form>
      </Paper>
    </Container>
  )
}

export default Signup
