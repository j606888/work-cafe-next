import { Button } from "@mui/material"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 360px;
  text-align: center;
  padding: 2rem;

  h3 {
    margin-top: 0;
  }

  button {
    margin-top: 1rem;
  }
`

const UploadSuccess = ({ onClose = () => {} }) => {
  const handleClose = () => {
    onClose()
  }
  return (
    <Container>
      <h3>感謝你的分享</h3>
      <p>上傳的照片可以在評論區找到</p>
      <Button variant="outlined" onClick={handleClose}>
        完成
      </Button>
    </Container>
  )
}

export default UploadSuccess
