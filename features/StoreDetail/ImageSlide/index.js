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

const slideImages = [
  "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJ7cWppEJ3bjQRyP8C2caQnGQ.jpeg",
  "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJczLMgQJ3bjQRUhtWgIPjd00.jpeg",
  "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJjwLN3et3bjQR2z-EfcX5KcI.jpeg",
  "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJPYHvLQ13bjQRKIYuehn6klA.jpeg",
]


const slideArgs = {
  autoplay: false,
  transitionDuration: 300,
  indicators: true
}

const ImageSlide = () => {
  return (
    <Container>
      <Slide {...slideArgs}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url(${slideImage})`, backgroundSize: 'cover'}}></div>
          </div>
        ))}
      </Slide>
    </Container>
  )
}

export default ImageSlide
