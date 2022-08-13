import React from 'react'
import styled from 'styled-components'
import RatingStars from '@/components/RatingStars'
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import MapIcon from "@mui/icons-material/Map"

const Container = styled.div`
  display: flex;

  .imgBox {
    width: 400px;
    height: 300px;

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
        margin-right: .5rem;
      }

      .tag {
        font-size: 4px;
        background-color: #680efb;
        border-radius: 12px;
        padding: 3px 12px;
        color: white;
        margin: 0 .5rem;
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

const StoreDetail = ({ imgUrl, name, tags, rating, ratingAmount, address, phone, googleUrl }) => {
  return (
    <Container>
      <div className="imgBox">
        <img src={imgUrl} alt={name} />
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
          <span>{ratingAmount}則評論</span>
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
          <a href={googleUrl} target="_blank">Google Map</a>
        </div>
      </div>
    </Container>
  )
}

export default StoreDetail
