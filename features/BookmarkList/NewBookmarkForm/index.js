import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import CloseIcon from "@mui/icons-material/Close"
import { Box } from "@mui/system"
import { createBookmark } from "api/bookmark"

const NewBookmarkForm = ({ open, onClose = () => {}, onSubmit = () => {} }) => {
  const [name, setName] = React.useState("")

  const handleClose = () => {
    onClose()
    setName("")
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = async () => {
    await createBookmark({ name })
    onSubmit()
    onClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          新增清單
          <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ fontSize: 12, textAlign: "right", color: "#666" }}>
            <span>{name.length}/40</span>
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            label="清單名稱"
            variant="outlined"
            sx={{ width: 400 }}
            inputProps={{ maxLength: 40 }}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={name.length === 0} onClick={handleSubmit}>
            建立
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewBookmarkForm
