import React from "react"
import styled from "styled-components"
import { Slide } from "react-slideshow-image"
import ImageSlide from "features/StoreDetail/ImageSlide"
import ImageSlider from "./ImageSlider"

const Container = styled.div`
`

const StoreCard = ({
  name,
  shortAddress,
  rating,
  reviewsCount,
  tags = [],
  images = [],
}) => {
  return <Container>
    <ImageSlider images={images} />
  </Container>
}

export default StoreCard
