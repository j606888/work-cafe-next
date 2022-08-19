import React, { useState } from "react"
import styled from "styled-components"
import RatingStars from "components/RatingStars"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import MapIcon from "@mui/icons-material/Map"

const Container = styled.div`
  display: flex;

  .imgBox {
    width: 300px;
    height: 200px;

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .content {
    margin-left: 2rem;

    .title {
      display: flex;
      align-items: center;

      h2 {
        margin-right: 0.5rem;
      }

      .tag {
        font-size: 4px;
        background-color: #680efb;
        border-radius: 12px;
        padding: 3px 12px;
        color: white;
        margin: 0 0.5rem;
      }
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 1rem;

      span {
        color: #0b4f93;
        font-size: 16px;
      }
    }

    .icon-info {
      margin: 1.5rem 0;
      display: flex;
      align-items: center;

      svg {
        margin-right: 1rem;
        color: #4a98fb;
      }
    }
  }
`

const StoreDetail = ({
  imageUrl,
  url,
  name,
  rating,
  userRatingsTotal,
  address,
  phone,
  permanentlyClosed,
  hidden,
}) => {
  const tags = []
  if (permanentlyClosed) tags.push("永久歇業")
  if (hidden) tags.push("隱藏中")

  return (
    <Container>
      <div className="imgBox">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="content">
        <div className="title">
          <h2>{name}</h2>
          {tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="rating">
          <RatingStars rating={rating} />
          <span>{userRatingsTotal || 0}則評論</span>
        </div>
        <div className="icon-info">
          <LocationOnIcon />
          {address}
        </div>
        <div className="icon-info">
          <LocalPhoneIcon />
          {phone}
        </div>
        <div className="icon-info">
          <MapIcon />
          <a href={url} target="_blank">
            Google Map
          </a>
        </div>
      </div>
    </Container>
  )
}

export default StoreDetail
