import SvgButton from "components/SvgButton"
import React from "react"
import styled from "styled-components"

// Pending, maybe will be delete
const ImageBlock = ({ photos = [] }) => {
  return (
    <Container>
      <Photos>
        {photos.map((photo, index) => {
          return <Image src={photo} alt={photo} key={index} />
        })}
      </Photos>
      <InfoBox>1/{photos.length}</InfoBox>
      <MoreButton path="foward-btn" />
    </Container>
  )
}

const MoreButton = styled(SvgButton)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`

const Container = styled.div`
  width: 572px;
  height: 360px;
  margin: 24px auto;
  position: relative;
`

const Photos = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  gap: 8px;
  border-radius: 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  & > *:not(:first-child) {
    filter: brightness(40%);
  }
`

const Image = styled.img`
  height: 100%;
  max-width: 80%;
  object-fit: cover;
`

const InfoBox = styled.div`
  padding: 8px 16px;
  min-width: 68px;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  background: #222120;
  border-radius: 12px;
  position: absolute;
  right: 16px;
  bottom: 16px;
`

export default ImageBlock
