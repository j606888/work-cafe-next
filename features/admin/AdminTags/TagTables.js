import React, { useRef, useState } from "react"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import EditTag from "./EditTag"
import TagApis from "api/admin/tag"

const TagTables = ({ tags, onEdit }) => {
  const [editTagId, setEditTagId] = useState(null)

  async function handleEdit() {
    setEditTagId(null)
    onEdit()
  }

  async function deleteTag(tagId) {
    await TagApis.deleteTag({ id: tagId })
    onEdit()
  }

  function handleClose() {
    setEditTagId(null)
  }

  return (
    <Table sx={{ minWidth: 500 }}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell align="right">Used Count</TableCell>
          <TableCell align="right">Created At</TableCell>
          <TableCell align="right" sx={{ minWidth: 180 }}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>{tag.id}</TableCell>
            <TableCell>{tag.name}</TableCell>
            <TableCell align="right">{tag.storeReviewTagsCount}</TableCell>
            <TableCell align="right">{tag.createdAt}</TableCell>
            <TableCell align="right" sx={{ display: "flex", gap: 2 }}>
              <EditTag
                tag={tag}
                onClose={handleClose}
                editTagId={editTagId}
                onEdit={handleEdit}
              />
              <Button variant="outlined" onClick={() => setEditTagId(tag.id)}>
                編輯
              </Button>
              {tag.storeReviewTagsCount === 0 && (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => deleteTag(tag.id)}
                >
                  刪除
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TagTables
