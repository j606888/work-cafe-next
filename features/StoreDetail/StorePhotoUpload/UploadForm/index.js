import React, { useState, useEffect } from "react"
import { Form, PreviewImageContainer } from "./styled"

const UploadForm = ({ onChange }) => {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])

  const handleChange = (event) => {
    const fileArr = []
    const tempFiles = event.target.files

    for (let i = 0; i < tempFiles.length; i++) {
      fileArr.push(tempFiles[i])
    }
    setFiles(fileArr)
    onChange(fileArr)
  }

  useEffect(() => {
    const objectUrls = files.map((file) => URL.createObjectURL(file))
    setPreviews(objectUrls)

    return () => {
      objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl))
    }
  }, [files])

  return (
    <>
      <Form>
        <label for="upload-photo">選擇照片</label>
        <input
          id="upload-photo"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          multiple
        />
      </Form>
      <PreviewImageContainer>
        {previews.map((preview) => (
          <div className="imgBox" key={preview}>
            <img src={preview} alt="abc" />
          </div>
        ))}
      </PreviewImageContainer>
    </>
  )
}

export default UploadForm
