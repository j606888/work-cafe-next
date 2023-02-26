import { grey01 } from "constants/color"
import { devices } from "constants/styled-theme"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const ImageUpload = ({ onChange = () => {} }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  function handleFileSelection(event) {
    setSelectedFiles((prevSelectedFiles) => {
      const existingFileNames = prevSelectedFiles.map((file) => file.name)
      const newFiles = Array.from(event.target.files).filter((file) => {
        return !existingFileNames.includes(file.name)
      })
      return [...prevSelectedFiles, ...newFiles]
    })
  }

  function handleButtonClick() {
    fileInputRef.current.click()
  }

  function removeFile(fileName) {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = prevSelectedFiles.filter(
        (file) => file.name !== fileName
      )
      return newSelectedFiles
    })
  }

  useEffect(() => {
    onChange(selectedFiles)
  }, [selectedFiles])

  return (
    <Container>
      <input
        type="file"
        multiple
        onChange={handleFileSelection}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button onClick={handleButtonClick}>
        <img src="/add.svg" alt="add" />
        新增相片
      </Button>
      <ImageContainer>
        {selectedFiles.map((file) => (
          <ImagePreview key={file.name}>
            <RemoveButton
              src="/cancel-filled.svg"
              alt="cancel"
              onClick={() => removeFile(file.name)}
            />
            <Image src={URL.createObjectURL(file)} alt={file.name} />
          </ImagePreview>
        ))}
      </ImageContainer>
    </Container>
  )
}

const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 16px;
`

const ImagePreview = styled.div`
  position: relative;
  width: 156px;
  height: 156px;
  border-radius: 12px;
  overflow: hidden;

  @media ${devices.mobileXl} {
    width: 128px;
    height: 128px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Button = styled.button`
  width: 128px;
  height: 44px;
  margin: 0 auto;
  color: ${grey01};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #222120;
  border-radius: 12px;
  background-color: #ffffff;
`

const RemoveButton = styled.img`
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
`

export default ImageUpload
