import React from "react"
import styled from "styled-components"
import ImageSlider from "./ImageSlider"
import { devices } from "constant/styled-theme"
import TagList from "components/TagList/TagList"
import ImageCarousel from "components/ImageCarousel"

const StoreCard = React.forwardRef(
  (
    {
      placeId,
      name,
      vicinity,
      reviewsCount,
      isOpen,
      lat,
      lng,
      images = [],
      tags = [],
      onClick = () => {},
      onMouseEnter = () => {},
      onMouseLeave = () => {},
    },
    ref
  ) => {
    function handleClick() {
      onClick({ placeId, lat, lng })
    }

    function handleMouseEnter() {
      onMouseEnter(placeId)
    }

    return (
      <Container
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        <ImageCarousel
          slides={images}
          width={240}
          height={240}
          mWidth={180}
          mHeight={154}
        />
        <MainInfo>
          <h3>{name}</h3>
          <GoodSpan>
            <img src="/icon-good.svg" alt="icon-good" />
            <span>&nbsp;&nbsp;{reviewsCount}</span>
          </GoodSpan>
        </MainInfo>
        <SecondInfo>
          <OpenStatus isOpen={isOpen}>
            {isOpen ? "營業中" : "已打烊"}
          </OpenStatus>
          <Address>・{vicinity}</Address>
        </SecondInfo>
        <TagList tags={tags} />
      </Container>
    )
  }
)
StoreCard.displayName = "StoreCard"

const Container = styled.div`
  width: 239px;
  background-color: #fff;
  position: relative;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  @media ${devices.mobileXl} {
    width: 180px;
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

  @media ${devices.mobileXl} {
    flex-direction: column;
    align-items: flex-start;

    h3 {
      max-width: 95%;
    }
  }
`

const SecondInfo = styled.div`
  display: flex;
  align-items: center;

  @media ${devices.mobileXl} {
    width: 90%;
    white-space: nowrap;
  }
`

const OpenStatus = styled.div`
  font-size: 12px;
  color: ${({ isOpen }) => (isOpen ? "green" : "#D92F25")};
`

const Address = styled.p`
  color: #757575;
  margin: 0;
  font-size: 12px;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
`

const GoodSpan = styled.div`
  @media ${devices.mobileXl} {
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

export default StoreCard
