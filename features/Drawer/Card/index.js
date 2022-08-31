import React from "react"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { Container, Content, ImageBox } from './styled'

const Card = ({
  placeId,
  imageUrl,
  name,
  openNow,
  userRatingsTotal,
  address,
  tags = ["很安靜", "有插座", "無限時"],
  onClick = () => {},
}) => {
  function handleOnClick() {
    onClick(placeId)
  }

  const image = imageUrl ? (
    <ImageBox>
      <img src={imageUrl} alt="img" />
    </ImageBox>
  ) : (
    <ImageBox border>
      No Photo
    </ImageBox>
  )

  return (
    <Container onClick={handleOnClick}>
      {image}
      <Content openNow={openNow}>
        <h3>{name}</h3>
        <div>
          <span className="opening">{openNow ? "營業中" : "休息中"}</span>
          <span>{userRatingsTotal}人推薦 適合工作</span>
        </div>
        <span className="address">{address}</span>
        <div className="tag-list">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <FavoriteBorderIcon sx={{ position: "absolute", right: 0, top: 0 }} />
      </Content>
    </Container>
  )
}

export default Card
