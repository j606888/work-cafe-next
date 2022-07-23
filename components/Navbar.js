import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#EDEDED", color: "#757575" }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight="bold">
            Work Cafe | Taiwan
          </Typography>
          <Box>
            <Button color="inherit">註冊</Button>
            <Button color="inherit">登入</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
