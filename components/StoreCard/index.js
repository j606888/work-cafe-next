import React from "react"
import styled from "styled-components"
import ImageSlider from "./ImageSlider"
import { devices } from "constant/styled-theme"
import TagList from "components/TagList/TagList"


const Container = styled.div`
  width: 239px;
  background-color: #fff;
  position: relative;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  @media ${devices.iphoneSE} {
    width: 154px;
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

  @media ${devices.iphoneSE} {
    flex-direction: column;
    align-items: flex-start;

    h3 {
      max-width: 100%;
    }
  }
`

const SecondInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${devices.iphoneSE} {
    width: 90%;
    white-space: nowrap;
  }
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

const GoodSpan = styled.div`
  @media ${devices.iphoneSE} {
    position: absolute;
    top: 9px;
    right: 9px;
    z-index: 10;
    background-color: #fff;
    border-radius: 12px;
    padding: 4px 10px;

    font-size: 12px;

    img {
      width: 14px;
    }
  }
`

const StoreCard = ({
  placeId,
  name,
  shortAddress,
  rating,
  reviewsCount,
  isOpen,
  images = [],
  tags = [],
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
        <GoodSpan>
            <img src='/icon-good.svg' alt='icon-good' />
            <span>&nbsp;&nbsp;{reviewsCount}</span>
        </GoodSpan>
      </MainInfo>
      <SecondInfo>
        <OpenStatus isOpen={isOpen}>{isOpen ? "營業中" : "已打烊"}</OpenStatus>
        <Address>{shortAddress}</Address>
      </SecondInfo>
      <TagList tags={tags}/>
    </Container>
  )
}

export default StoreCard
