import React from "react"
import styled from "styled-components"
import ImageSlider from "./ImageSlider"
import StarIcon from '@mui/icons-material/Star';
import _ from 'lodash'

const Container = styled.div`
  width: 280px;
  height: 320px;
  background-color: #fff;

  h3 {
    margin: 0;
    font-size: 16px;
  }
`
const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 4px;

  div {
    display: flex;
    align-items: center;
  }
`

const SecondInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const OpenStatus = styled.div`
  font-size: 14px;
  color: ${({ isOpen }) => (isOpen ? "green" : "#D92F25")};
`

const Address = styled.p`
  color: #999;
  margin: 0;
  font-size: 12px;
`


const StoreCard = ({
  placeId,
  name,
  shortAddress,
  rating,
  reviewsCount,
  isOpen,
  images = [],
  onClick = () => {},
}) => {
  function handleClick() {
    onClick(placeId)
  }
  return <Container onClick={handleClick}>
    <ImageSlider images={images} />
    <MainInfo>
      <h3>{_.truncate(name)}</h3>
      <div>
        <StarIcon sx={{fontSize: 18}}/>
        <span>{rating}({reviewsCount})</span>
      </div>
    </MainInfo>
    <SecondInfo>
      <Address>{shortAddress}</Address>
      <OpenStatus isOpen={isOpen}>{isOpen ? "營業中" : "已打烊"}</OpenStatus>
    </SecondInfo>
  </Container>
}

export default StoreCard
