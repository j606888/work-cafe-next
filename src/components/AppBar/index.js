import { styled } from "@mui/material/styles"
import { IconButton, Toolbar, Typography, AppBar as MuiAppBar, Button } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useRouter } from "next/router"
import { useEffect, useContext } from "react"
import AuthContext from "@/context/authContext"

const Container = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}))

const AppBar = ({ toggleDrawer }) => {
  const { user, isLoading, logout } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const currentUrl = window.location.href
    if (!isLoading && !user) router.push(`/login?to=${currentUrl}`)
  }, [isLoading, user])

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
        {user && (
          <>
            {"Hello, " + user.name}
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </Container>
  )
}

export default AppBar
