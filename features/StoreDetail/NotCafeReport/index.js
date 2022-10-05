import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useState } from "react"
import { instance } from "api"

const NotCafeReport = ({ placeId, open, onClose }) => {
  const [done, setDone] = useState(false)

  async function handleReport() {
    await instance.post(`stores/${placeId}/not-cafe-reports`)
    setDone(true)
  }

  function handleClose() {
    setDone(false)
    onClose()
  }

  return done ? (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>感謝您提供的資訊！</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>返回</Button>
      </DialogActions>
    </Dialog>
  ) : (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>要回報這間店不是咖啡廳嗎?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>不要好了</Button>
        <Button onClick={handleReport}>確定</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NotCafeReport
