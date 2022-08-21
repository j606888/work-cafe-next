import React from "react"
import { styled } from "@mui/material/styles"
import {
  Box,
  CssBaseline,
} from "@mui/material"
import {
  Home as HomeIcon,
  Map as MapIcon,
  Store as StoreIcon,
  Person as PersonIcon,
  BugReport as BugReportIcon,
  RemoveModerator as RemoveModeratorIcon,
} from "@mui/icons-material"
import AppBar from "../AppBar"
import MiniDrawer from "../MiniDrawer"
import { getUser, userIsAdmin, userIsLogin } from "utils/user"
import { useRouter } from "next/router"
import Skeleton from "components/Skeleton"

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
    url: "/admin/dashboard",
    icon: <HomeIcon />,
  },
  {
    text: "Crawl Store",
    url: "/admin/crawls",
    icon: <BugReportIcon />,
  },
  {
    text: "GoogleMap",
    url: "/admin/map",
    icon: <MapIcon />,
  },
  {
    text: "Stores",
    url: "/admin/stores",
    icon: <StoreIcon />,
  },
  {
    text: "BlackList",
    url: "/admin/blacklist",
    icon: <RemoveModeratorIcon />,
  },
  {
    text: "Users",
    url: "/admin/users",
    icon: <PersonIcon />,
  },
]

const AdminLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const [isReady, setIsReady] = React.useState(false)
  const router = useRouter()
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const u = getUser()
    setUser(u)
  }, [])

  React.useEffect(() => {
    if (!userIsLogin()) {
      const currentUrl = window.location.href
      router.push(`/login?to=${currentUrl}`)
    } else if (!userIsAdmin()) {
      router.push("/")
    } else {
      setIsReady(true)
    }
  }, [router])

  const toggleDrawer = () => {
    setOpen((cur) => !cur)
  }

  function handleLogout() {
    localStorage.clear()
    router.push("/login")
  }

  if (!isReady) {
    return <Skeleton />
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#f6f7fb", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        toggleDrawer={toggleDrawer}
        user={user}
        handleLogout={handleLogout}
      />
      <MiniDrawer open={open} lists={lists} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout
