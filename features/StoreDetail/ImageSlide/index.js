import React from "react"
import styled from "styled-components"
import { Slide } from "react-slideshow-image"

const Container = styled.div`
  .indicators {
    padding: 0;
    margin: 12px 0 0 0;
  }

  .each-slide > div {
    display: flex;
    align-items: center;
    height: 220px;
  }
`
const SingleImageContainer = styled.div`
  display: flex;

  .imgBox {
    width: 100%;
    height: 220px;

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`

const slideArgs = {
  autoplay: false,
  transitionDuration: 300,
  indicators: true
}

const ImageSlide = ({ photos=[] }) => {
  if (photos.length === 1) {
    return <SingleImageContainer>
      <div className="imgBox">
        <img src={photos[0]} alt='store' />
      </div>
    </SingleImageContainer>
  }
  return (
    <Container>
      <Slide {...slideArgs}>
        {photos.map((image, index) => (
          <div className="each-slide" key={index}>
            <div style={{ 
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        ))}
      </Slide>
    </Container>
  )
}

export default ImageSlide
