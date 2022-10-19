import React, { useState } from "react"
import styled, { css } from "styled-components"
import { devices } from "constant/styled-theme"
import ImageCanvas from "./ImageCanvas"

const Container = styled.div`
  margin: 2rem 56px;
  height: 240px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 5fr 2fr;
  grid-template-areas:
    "A B"
    "A C";
  position: relative;

  @media ${devices.iphoneSE} {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    margin: 1rem 28px 1rem 28px;
  }
`

const Box = styled.div`
  background: ${({ img }) => `url(${img}) #EDEDED`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  @media ${devices.iphoneSE} {
    ${({ hide }) => hide && `display: none;`}
    width: 90%;
    height: 240px;
    flex: none;
    border-radius: 0 !important;
  }
`

const BoxA = styled(Box)`
  grid-area: A;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`
const BoxB = styled(Box)`
  grid-area: B;
  border-top-right-radius: 12px;
`
const BoxC = styled(Box)`
  grid-area: C;
  border-bottom-right-radius: 12px;
  position: relative;
  overflow: hidden;

  ${({ leftCount }) =>
    leftCount > 0 &&
    css`
      &::after {
        content: "還有${leftCount}張";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #fff;
        background: rgba(0, 0, 0, 0.6);
      }
    `}
`

const Button = styled.button`
  position: absolute;
  left: 12px;
  bottom: 12px;
  background-color: #fff;
  border-radius: 12px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #757575;
  cursor: pointer;

  @media ${devices.iphoneSE} {
    display: none;
  }
`

// TODO, should not load all images, only after click
const ImagePreview = ({ photos = [], name }) => {
  const [open, setOpen] = useState(false)
  const leftCount = photos.length - 3
  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Container onClick={() => setOpen(true)}>
        <BoxA img={photos[0]}></BoxA>
        <BoxB img={photos[1]} hide={photos.length < 2}></BoxB>
        <BoxC
          img={photos[2]}
          hide={photos.length < 3}
          leftCount={leftCount}
        ></BoxC>
        <Button onClick={() => setOpen(true)}>所有照片</Button>
      </Container>
      <ImageCanvas
        photos={photos}
        open={open}
        onClose={handleClose}
        name={name}
      />
    </>
  )
}

export default ImagePreview
