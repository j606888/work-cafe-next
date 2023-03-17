import React from "react"
import {
  Box,
} from "@mui/material"
import {
  Home as HomeIcon,
  Map as MapIcon,
  Person as PersonIcon,
  BugReport as BugReportIcon,
  Hub as HubIcon,
  Sell as SellIcon,
  Message as MessageIcon
} from "@mui/icons-material"
import AppBar from "./AppBar"
import MiniDrawer from "components/MiniDrawer"
import { useRouter } from "next/router"
import Skeleton from "components/Skeleton"
import useUserStore from "stores/useUserStore"

const lists = [
  {
    text: "Home",
    url: "/admin/dashboard",
    icon: <HomeIcon />,
  },
  {
    text: "Crawl Store",
    url: "/admin/crawls/@23.685859,119.006545,8z",
    icon: <BugReportIcon />,
  },
  {
    text: "GoogleMap",
    url: "/",
    icon: <MapIcon />,
  },
  {
    text: "ChainStores",
    url: "/admin/chain-stores",
    icon: <HubIcon />,
  },
  {
    text: "Users",
    url: "/admin/users",
    icon: <PersonIcon />,
  },
  {
    text: "Users",
    url: "/admin/tags",
    icon: <SellIcon />,
  },
  {
    text: "Reviews",
    url: "/admin/reviews",
    icon: <MessageIcon />,
  },
]

const AdminLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const [isReady, setIsReady] = React.useState(false)
  const router = useRouter()
  const user = useUserStore(state => state.user)

  React.useEffect(() => {
    if (!user) {
      const currentUrl = window.location.href
      router.push(`/login?to=${currentUrl}`)
    } else if (user?.role !== "admin") {
      router.push("/")
    } else {
      setIsReady(true)
    }
  }, [user, router])

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
      <Box component="main" sx={{ flexGrow: 1, zIndex: 10, paddingTop: '64px', boxSizing: 'border-box' }}>
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout
