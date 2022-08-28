import React from "react"
import Link from "next/link"
import {
  Accessibility as AccessibilityIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material"

const UserMenu = ({ user, onLogout, type = "user" }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget)
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null)
  }

  function handleLogout() {
    if (onLogout) onLogout()
  }

  const avatar = (user) => {
    const firstLetter = user.name[0].toUpperCase()

    return user.avatar_url ? (
      <Avatar alt={user.name} src={user.avatar_url} />
    ) : (
      <Avatar>{firstLetter}</Avatar>
    )
  }

  return (
    <>
      <Box>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {avatar(user)}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        sx={{ mt: "32px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {type === "user" && (
          <Link href="/admin/stores">
            <MenuItem sx={{ minWidth: "160px" }}>
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              <Typography color="text.secondary">Admin</Typography>
            </MenuItem>
          </Link>
        )}
        {type === "admin" && (
          <Link href="/">
            <MenuItem sx={{ minWidth: "160px" }}>
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              <Typography color="text.secondary">User</Typography>
            </MenuItem>
          </Link>
        )}

        <Link href="/settings">
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography color="text.secondary">設定</Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Typography color="text.secondary">登出</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
