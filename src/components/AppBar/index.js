import { styled } from "@mui/material/styles"
import { IconButton, Toolbar, Typography, AppBar as MuiAppBar, Button } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"

const Container = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}))

const LogoutBtn = ({ setIsLogin }) => {
  function handleLogout() {
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  )
}

const LoginBtn = () => {
  const router = useRouter()

  function handleLogin() {
    router.push("/login")
  }

  return (
    <Button color="inherit" onClick={handleLogin}>
      Login
    </Button>
  )
}

const AppBar = ({ toggleDrawer  }) => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) setIsLogin(true)
  }, [])

  const button = isLogin ? <LogoutBtn setIsLogin={setIsLogin} /> : <LoginBtn />

  return (
    <Container position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Work Cafe Dashboard
        </Typography>
        {button}
      </Toolbar>
    </Container>
  )
}

export default AppBar
