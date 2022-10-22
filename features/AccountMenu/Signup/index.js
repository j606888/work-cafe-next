import React, { useState } from "react"
import { Button, Dialog, IconButton, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { signup } from "api/auth"
import { Container, Form, CloseButton } from "./styled"
import useUserStore from "stores/useUserStore"
import { useMediaQuery } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { devices } from 'constant/styled-theme'

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

const Signup = ({ open, onClose, onChangeMode }) => {
  const fullScreen = useMediaQuery(devices.mobileXl)
  const login = useUserStore((state) => state.login)
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
      login(accessToken)
      onClose({  deep: true})
    },
  })

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <Container>
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
            已經有帳號了嗎？<Button onClick={onChangeMode}>登入</Button>
          </p>
        </Form>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </Container>
    </Dialog>
  )
}

export default Signup
