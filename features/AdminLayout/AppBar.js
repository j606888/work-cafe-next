import { styled } from "@mui/material/styles"
import { IconButton, Toolbar, Typography, AppBar as MuiAppBar, Button } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import UserMenu from "features/Header/UserMenu"

const Container = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}))

const AppBar = ({ toggleDrawer, user, handleLogout }) => {
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
        <UserMenu user={user} onLogout={handleLogout} type="admin" />
      </Toolbar>
    </Container>
  )
}

export default AppBar
