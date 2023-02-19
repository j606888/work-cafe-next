import {
  Divider,
  Paper,
  Typography,
} from "@mui/material"
import React from "react"
import useSWR from "swr"
import NewTag from "./NewTag"
import TagTables from "./TagTables"

const AdminTags = () => {
  const { data, mutate } = useSWR("/admin/tags")

  function handleEdit() {
    mutate()
  }

  function handleCreate() {
    mutate()
  }

  if (!data) return null

  return (
    <Paper sx={{ maxWidth: 1024, m: 3, p: 3, position: "relative" }}>
      <Typography variant="h4">標籤</Typography>
      <Divider />
      <TagTables tags={data} onEdit={handleEdit} />
      <NewTag onCreate={handleCreate}/>
    </Paper>
  )
}

export default AdminTags
