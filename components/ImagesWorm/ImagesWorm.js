import { ImageList, ImageListItem } from "@mui/material"
import React from "react"
import styled from "styled-components"
import { devices } from "constant/styled-theme"

const IMAGE = "https://picsum.photos/460/240"

const More = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff;

  @media ${devices.iphoneSE} {
    font-size: 16px;
  }
`
const One = ({ images }) => {
  return (
    <ImageList
      sx={{ width: "100%" }}
      variant="quilted"
      cols={1}
      rowHeight={240}
    >
      <ImageListItem cols={1} rows={1}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
    </ImageList>
  )
}
const Two = ({ images }) => {
  return (
    <ImageList
      sx={{ width: "100%" }}
      variant="quilted"
      cols={2}
      rowHeight={240}
    >
      <ImageListItem cols={1} rows={1}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={1} rows={1}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
    </ImageList>
  )
}
const Three = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%" }} variant="quilted" cols={4} rowHeight={60}>
      <ImageListItem cols={2} rows={4}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
    </ImageList>
  )
}
const Four = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%" }} variant="quilted" cols={4} rowHeight={60}>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
    </ImageList>
  )
}
const MoreThanFour = ({ images }) => {
  const leftCount = images.length - 4
  return (
    <ImageList sx={{ width: "100%" }} variant="quilted" cols={4} rowHeight={60}>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" />
      </ImageListItem>
      <ImageListItem cols={2} rows={2}>
        <img src={IMAGE} alt="hey" loading="lazy" style={{ filter: 'brightness(50%)'}} />
        <More>還有 {leftCount} 張</More>
      </ImageListItem>
    </ImageList>
  )
}

const ImagesWorm = ({ images = [] }) => {
  const length = images.length

  if (length === 0) return null
  else if (length === 1) return <One images={images} />
  else if (length === 2) return <Two images={images} />
  else if (length === 3) return <Three images={images} />
  else if (length === 4) return <Four images={images} />
  else return <MoreThanFour images={images} />
}

export default ImagesWorm
