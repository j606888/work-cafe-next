import React from 'react'
import { styled } from "@mui/material/styles"
import { Box, CssBaseline, Typography } from '@mui/material'
import {
  Home as HomeIcon,
  Map as MapIcon,
  Store as StoreIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import AppBar from '../AppBar'
import MiniDrawer from '../MiniDrawer'
import Dashboard from '../Dashboard'

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const lists = [
  {
    text: "Home",
    icon: <HomeIcon />,
  },
  {
    text: "GoogleMap",
    icon: <MapIcon />,
  },
  {
    text: "Stores",
    icon: <StoreIcon />,
  },
  {
    text: "Users",
    icon: <PersonIcon />,
  },
]

const AdminLayout = () => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen((cur) => !cur)
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#f6f7fb", minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar toggleDrawer={toggleDrawer} />
      <MiniDrawer open={open} lists={lists} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Dashboard />
      </Box>
    </Box>
  )
}

export default AdminLayout
