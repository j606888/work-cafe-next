import React, { useState } from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"
import { Dialog } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import useMediaQuery from "@mui/material/useMediaQuery"

const DialogContainer = styled.div`
  display: flex;
  height: 80vh;

  @media ${devices.iphoneSE} {
    height: 100vh;
  }
`

const Slider = styled.div`
  min-height: 100%;
  overflow: auto;
  background: #333;
`

const BoxBox = styled.div`
  width: 320px;
  background-color: #fff;
  cursor: pointer;

  @media ${devices.iphoneSE} {
    width: 100%;
    max-height: 100%;
    cursor: none;
  }
`

const FullImage = styled.div`
  background-color: #000;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${devices.iphoneSE} {
    display: none;
  }
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const StoreName = styled.div`
  background-color: #fff;
  position: sticky;
  left: 0;
  top: 0;
  padding: .8rem;
  text-align: center;
  width: 320px;
  box-sizing: border-box;
`

const ImageCanvas = ({ photos, open, onClose, name }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const fullScreen = useMediaQuery(devices.iphoneSE)

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
    >
      <DialogContainer>
        <Slider>
          <StoreName>{name}</StoreName>
          {photos.map((photo, index) => (
            <BoxBox key={index} onClick={() => setImageIndex(index)}>
              <Img src={photo} alt="slide" />
            </BoxBox>
          ))}
        </Slider>
        <FullImage>
          <Img src={photos[imageIndex]} alt="fake_image" />
        </FullImage>
        <CloseIcon
          sx={{
            color: "#999",
            position: "absolute",
            top: 12,
            right: 12,
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={onClose}
        />
      </DialogContainer>
    </Dialog>
  )
}

export default ImageCanvas
