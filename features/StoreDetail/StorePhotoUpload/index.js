import { useState } from "react"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import { Dialog } from "@mui/material"
import UploadSuccess from "./UploadSuccess"
import UploadForm from "./UploadForm"
import Chip from "components/Chip"

const StorePhotoUpload = ({ placeId, name, onSuccess = () => {} }) => {
  const [open, setOpen] = useState(false)
  const [finish, setFinish] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSuccess = () => {
    setFinish(true)
    onSuccess()
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
      <Chip onClick={() => setOpen(true)} text="新增照片">
        <PhotoCameraIcon />
      </Chip>
    </>
  )
}

export default StorePhotoUpload
