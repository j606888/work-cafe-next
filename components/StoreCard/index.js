import React from "react"
import styled from "styled-components"
import ImageSlider from "./ImageSlider"

const Container = styled.div`
  width: 239px;
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

  h3 {
    max-width: 70%;
    overflow: hidden;
    white-space: nowrap;
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
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
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
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  function handleClick() {
    onClick(placeId)
  }

  function handleMouseEnter() {
    onMouseEnter(placeId)
  }
  return (
    <Container
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ImageSlider images={images} />
      <MainInfo>
        <h3>{name}</h3>
        <div>
            <img src='/icon-good.svg' alt='icon-good' />
            <span>&nbsp;&nbsp;{reviewsCount}</span>
        </div>
      </MainInfo>
      <SecondInfo>
        <OpenStatus isOpen={isOpen}>{isOpen ? "營業中" : "已打烊"}</OpenStatus>
        <Address>{shortAddress}</Address>
      </SecondInfo>
    </Container>
  )
}

export default StoreCard
