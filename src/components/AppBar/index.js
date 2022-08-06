import { styled } from "@mui/material/styles"
import { IconButton, Toolbar, Typography, AppBar as MuiAppBar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

const Container = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}))

const AppBar = ({ toggleDrawer  }) => {
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
        <Typography variant="h6" noWrap component="div">
          Work Cafe Dashboard
        </Typography>
      </Toolbar>
    </Container>
  )
}

export default AppBar
