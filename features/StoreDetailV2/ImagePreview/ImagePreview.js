import React from 'react'
import styled from 'styled-components'
import { devices } from "constant/styled-theme"

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
  /* background-color:  */
  background: ${({ img }) => `url(${img}) #EDEDED`};
  background-size: cover;

  img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  @media ${devices.iphoneSE} {
    width: 240px;
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

const ImagePreview = ({ photos=[] }) => {
  return (
    <Container>
      <BoxA img={photos[0]}></BoxA>
      <BoxB img={photos[1]}></BoxB>
      <BoxC img={photos[2]}></BoxC>
      <Button>所有照片</Button>
    </Container>
  )
}

export default ImagePreview
