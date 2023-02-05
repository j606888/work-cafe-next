import { Dialog } from "@mui/material"
import { useGoogleLogin } from "@react-oauth/google"
import OrDivider from "components/OrDivider"
import { grey01, grey02, grey03, grey04 } from "constants/color"
import React from "react"
import styled from "styled-components"
import { googleLogin as googleLoginAPI } from "api/auth"
import useUserStore from "stores/useUserStore"
import { devices } from "constants/styled-theme"

const DialogStyles = {
  borderRadius: "20px",
  width: "600px",
  // minHeight: "500px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
}

const LoginForm = ({ open, onClose }) => {
  const login = useUserStore((state) => state.login)

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { accessToken, refreshToken } = await googleLoginAPI({
        accessToken: tokenResponse.access_token,
      })
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      login(accessToken)

      onClose({ deep: true })
    },
  })
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: DialogStyles }}>
      <Header>
        登入或註冊
        <CloseButton src="/cancel.svg" alt="cancel" onClick={onClose} />
      </Header>
      <Content>
        {/* <Title>歡迎加入Work Cafe!</Title>
        <Description>成為會員，集中收藏你的工作愛店。</Description>
        <Input placeholder="Email" />
        <Input type="password" placeholder="密碼" />
        <ConfirmButton type="submit" disabled>繼續(開發中)</ConfirmButton>
        <OrDivider /> */}
        <GoogleLogin onClick={googleLogin}>
          <Icon src="/google.svg" alt="google" />
          繼續使用 Google 登入
        </GoogleLogin>
      </Content>
    </Dialog>
  )
}

const Header = styled.div`
  border-bottom: 1px solid ${grey04};
  height: 72px;
  line-height: 72px;
  text-align: center;
  font-size: 20px;
  position: relative;

  @media ${devices.mobileXl} {
    font-size: 18px;
    height: 56px;
    line-height: 56px;
  }
`

const Content = styled.div`
  padding: 44px 52px;

  @media ${devices.mobileXl} {
    padding: 22px 24px;
  }
`

const Title = styled.h3`
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  display: flex;
  align-items: center;
  color: ${grey01};
  margin: 0;
  margin-bottom: 12px;

  @media ${devices.mobileXl} {
    font-size: 24px;
    margin-bottom: 4px;
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: 32px;
  color: ${grey01};

  @media ${devices.mobileXl} {
    margin-bottom: 18px;
  }
`

const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid ${grey03};
  height: 52px;
  line-height: 52px;
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 0 23px;
  font-size: 16px;

  &::placeholder {
    color: ${grey02};
  }
`

const ConfirmButton = styled.button`
  margin-top: 16px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  width: 100%;
  /* background: ${grey01}; */
  border-radius: 12px;
  height: 44px;
  color: #ffffff;
  border: none;
  font-size: 16px;
  /* cursor: pointer; */

  /* disabled */
  cursor: not-allowed;
  background-color: #999;
`

const GoogleLogin = styled.button`
  position: relative;
  width: 100%;
  border-radius: 12px;
  height: 44px;
  color: #000000;
  border: 1px solid #000000;
  background-color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`

const Icon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 18px;
`

const CloseButton = styled.img`
  position: absolute;
  top: 24px;
  right: 28px;
  cursor: pointer;

  @media ${devices.mobileXl} {
    top: 16px;
    right: 20px;
  }
`

export default LoginForm
