import React from "react"
import { styled } from "@mui/material/styles"
import {
  Box,
} from "@mui/material"
import {
  Home as HomeIcon,
  Map as MapIcon,
  Store as StoreIcon,
  Person as PersonIcon,
  BugReport as BugReportIcon,
  RemoveModerator as RemoveModeratorIcon,
} from "@mui/icons-material"
import AppBar from "./AppBar"
import MiniDrawer from "../../components/MiniDrawer"
import { getUser, userIsAdmin, userIsLogin } from "utils/user"
import { useRouter } from "next/router"
import Skeleton from "components/Skeleton"

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
    url: "/",
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
      <AppBar
        toggleDrawer={toggleDrawer}
        user={user}
        handleLogout={handleLogout}
      />
      <MiniDrawer open={open} lists={lists} />
      <Box component="main" sx={{ flexGrow: 1, zIndex: 10, paddingTop: '64px' }}>
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout
