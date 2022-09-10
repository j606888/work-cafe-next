import RatingStars from "components/RatingStars"
import React from "react"
import { Container, Content, ImageBox } from "./styled"

const Card = ({
  placeId,
  imageUrl,
  name,
  openNow,
  userRatingsTotal,
  address,
  rating,
  tags = [],
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  function handleOnClick() {
    onClick(placeId)
  }

  function handleMouseEnter() {
    onMouseEnter(placeId)
  }

  function handleMouseLeave() {
    onMouseLeave(placeId)
  }

  const image = imageUrl ? (
    <ImageBox>
      <img src={imageUrl} alt="img" />
    </ImageBox>
  ) : (
    <ImageBox border>No Photo</ImageBox>
  )

  return (
    <Container
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {image}
      <Content openNow={openNow}>
        <span className="title">{name}</span>
        <RatingStars rating={rating} userRatingsTotal={userRatingsTotal} />
        <span className="address">{address}</span>
        <span className="opening">{openNow ? "營業中" : "休息中"}</span>
        <div className="tag-list">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </Content>
    </Container>
  )
}

export default Card
