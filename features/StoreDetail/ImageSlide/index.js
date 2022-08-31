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
    justify-content;
    height: 350px;
  }
`

const slideArgs = {
  autoplay: false,
  transitionDuration: 300,
  indicators: true
}

const ImageSlide = ({ photos=[] }) => {
  return (
    <Container>
      <Slide {...slideArgs}>
        {photos.map((image, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'}}></div>
          </div>
        ))}
      </Slide>
    </Container>
  )
}

export default ImageSlide
