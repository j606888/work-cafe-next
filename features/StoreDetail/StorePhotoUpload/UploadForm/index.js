import React, { useState, useEffect } from "react"
import { Form, PreviewImageContainer, ButtonContainer } from "./styled"
import { Button, Divider } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import axios from "axios"
import StorePhotoApi from "api/store-photo"

const UploadForm = ({
  name,
  placeId,
  onClose = () => {},
  onSuccess = () => {},
}) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [previews, setPreviews] = useState([])

  const handleChange = (event) => {
    const fileArr = []
    const tempFiles = event.target.files

    for (let i = 0; i < tempFiles.length; i++) {
      fileArr.push(tempFiles[i])
    }
    setFiles(fileArr)
  }

  const handleClose = () => {
    setFiles([])
    onClose()
  }

  const handleClick = async (e) => {
    setLoading(true)
    e.preventDefault()

    for (let file of files) {
      const { url } = await StorePhotoApi.getUploadLink({ placeId })
      const config = {
        headers: {
          "Content-Type": file.type,
        },
      }
      await axios.put(url, file, config)
      const link = url.split("?")[0]
      await StorePhotoApi.createStorePhoto({ placeId, url: link })
    }
    setLoading(false)
    onSuccess()
  }

  useEffect(() => {
    if (files.length === 0) {
      setPreviews([])
      return
    }

    const objectUrls = files.map((file) => URL.createObjectURL(file))
    setPreviews(objectUrls)

    return () => {
      objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl))
    }
  }, [files])

  return (
    <>
      <Form>
        <h3>上傳照片至 {name} 店家</h3>
        <div>
          <label for="upload-photo">選擇照片</label>
          <input
            id="upload-photo"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            multiple
          />
        </div>
        <PreviewImageContainer>
          {previews.map((preview) => (
            <div className="imgBox" key={preview}>
              <img src={preview} alt="abc" />
            </div>
          ))}
        </PreviewImageContainer>
        <Divider />
        <ButtonContainer>
          <Button onClick={handleClose} variant="outlined">
            取消
          </Button>
          <LoadingButton
            onClick={handleClick}
            loading={loading}
            variant="contained"
          >
            上傳
          </LoadingButton>
        </ButtonContainer>
      </Form>
    </>
  )
}

export default UploadForm
