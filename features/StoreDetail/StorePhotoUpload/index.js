import { useState } from "react"
import UploadSuccess from "./UploadSuccess"
import UploadForm from "./UploadForm"

const StorePhotoUpload = ({ placeId, name, onSuccess = () => {} }) => {
  const [finish, setFinish] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSuccess = () => {
    setFinish(true)
    onSuccess()
  }

  if (finish) return <UploadSuccess onClose={handleClose} />

  return (
    <UploadForm
      placeId={placeId}
      name={name}
      onClose={handleClose}
      onSuccess={handleSuccess}
    />
  )
}

export default StorePhotoUpload
