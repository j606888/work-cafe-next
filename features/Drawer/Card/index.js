import React from 'react'
import styled from 'styled-components'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Container = styled.div`
  display: flex;
  gap: 1.2rem;
  border: 1px solid red;
`

const ImageBox = styled.div`
  width: 168px;
  height: 168px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #444;
  width: 200px;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  span {
    font-size: 12px;
  }

  .opening {
    display: block;
  }

  .address {
    display: block;
    margin: 0.6rem 0;
  }

  .tag-list {
    display: flex;
    gap: 0.5rem;

    span {
      border: 1px solid #444;
      border-radius: 12px;
      padding: 0.3rem 0.6rem;

    }
  }
`

const Card = ({ imageUrl, name, isOpening, reviews, address, tags = []}) => {
  return (
    <Container>
      <ImageBox>
        <img src={imageUrl} alt="img" />
      </ImageBox>
      <Content>
        <h3>{name}</h3>
        <div>
          <span className='opening'>{isOpening ? '營業中' : '休息中'}</span>
          <span className='recommend'>{reviews}人推薦 適合工作</span>
        </div>
        <span className='address'>{address}</span>
        <div className='tag-list'>
          {tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <FavoriteBorderIcon sx={{ position: 'absolute', right: 0, top: 0}}/>
      </Content>
    </Container>
  )
}

export default Card
