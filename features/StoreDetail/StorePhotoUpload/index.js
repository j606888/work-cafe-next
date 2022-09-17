import { useState } from "react"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import { Dialog } from "@mui/material"
import { Container } from "./styled"
import UploadSuccess from "./UploadSuccess"
import UploadForm from "./UploadForm"

const StorePhotoUpload = ({ placeId, name }) => {
  const [open, setOpen] = useState(false)
  const [finish, setFinish] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSuccess = () => {
    setFinish(true)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {!finish && (
          <UploadForm
            placeId={placeId}
            name={name}
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        )}
        {finish && <UploadSuccess onClose={handleClose} />}
      </Dialog>
      <Container onClick={() => setOpen(true)}>
        <PhotoCameraIcon />
        <span>新增照片</span>
      </Container>
    </>
  )
}

export default StorePhotoUpload
