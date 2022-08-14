import React from 'react'
import styled from 'styled-components'
import RatingStars from '@/components/RatingStars'

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  background: white;
  padding: 0.5rem;
  width: 400px;
  border: none;
  border-radius: 2px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

  .imgBox {
    width: 120px;
    height: 120px;

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: calc(400px - 160px - 1rem);
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    h4 {
      color: #2980b9;
    }

    span:last-child {
      color: #333;
      font-size: 12px;
    }
  }
`

const Card = ({
  id,
  imageUrl,
  name,
  rating,
  userRatingsTotal,
  placeId,
  onMouseEnter,
  onMouseLeave,
}) => {
  function handleMouseEnter() {
    if (onMouseEnter) onMouseEnter(id)
  }

  function handleMouseLeave() {
    if (onMouseLeave) onMouseLeave(id)
  }

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="imgBox">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="content">
        <a href={`/admin/stores/${placeId}`} target="_blank">
          <h4>{name}</h4>
        </a>
        <RatingStars rating={rating} />
        <span>{userRatingsTotal} 則評論</span>
      </div>
    </Container>
  )
}

export default Card
