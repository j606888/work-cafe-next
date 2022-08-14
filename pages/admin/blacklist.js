import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react"
import AdminLayout from "src/components/AdminLayout"
import { useState } from "react"
import { useEffect } from "react"
import {
  getBlacklists,
  createBlacklist,
  deleteBlacklist,
} from "@/api/blacklist"

const BlacklistPage = () => {
  const [blacklists, setBlacklists] = useState([])
  const [keyword, setKeyword] = useState("")

  async function fetchBlacklists() {
    const res = await getBlacklists()
    setBlacklists(res)
  }

  useEffect(() => {
    fetchBlacklists()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (keyword === "") return
    setKeyword("")

    await createBlacklist({ keyword })
    fetchBlacklists()
  }

  async function handleDelete(id) {
    await deleteBlacklist({ id })
    fetchBlacklists()
  }

  return (
    <AdminLayout>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" mb={2}>
            New Blacklist Keyword
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <TextField
              label="keyword..."
              variant="filled"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              required
            />
            <Button variant="contained" type="submit">
              Create
            </Button>
          </Box>
        </form>
        <Divider sx={{ marginY: 4 }} />
        <Grid container spacing={2}>
          {blacklists.map((blacklist) => {
            return (
              <Grid
                item
                key={blacklist.id}
                xs={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(blacklist.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Box component="span" ml={1}>
                  {blacklist.keyword}
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    </AdminLayout>
  )
}

export default BlacklistPage
