import { Avatar } from "@mui/material"
import useTimeAgo from "hooks/useTimeAgo"
import React from "react"
import styled from "styled-components"
import { InfoBox } from "../ReviewStoreCard/styled"

const Container = styled.div`
  .time-ago {
    margin-left: 3rem;
    font-size: 12px;
    color: #333;
  }
`

const ImageBox = styled.div`
  width: 300px;
  height: 200px;
  margin: 0.5rem auto;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const StorePhotoCard = ({
  store,
  photos = [],
  createdAt,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const timeAgo = useTimeAgo()

  const handleClick = () => {
    onClick(store.placeId)
  }
  const handleMouseEnter = () => {
    onMouseEnter(store.placeId)
  }
  const handleMouseLeave = () => {
    onMouseLeave(store.placeId)
  }

  return (
    <Container
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <InfoBox>
        <Avatar
          alt={"storename"}
          sx={{ width: 36, height: 36, mr: 1.5 }}
          src={store.imageUrl}
        />
        <div className="store-info">
          <span className="name">{store.name}</span>
          <span className="address">{store.address}</span>
        </div>
      </InfoBox>
      <span className="time-ago">{timeAgo(createdAt)}</span>
      <div>
        {photos.map((photo) => (
          <ImageBox key={photo.randomKey}>
            <img src={photo.imageUrl} alt={photo.randomKey} />
          </ImageBox>
        ))}
      </div>
    </Container>
  )
}

export default StorePhotoCard
